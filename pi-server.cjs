#!/usr/bin/env node
/**
 * 联影AI_Base_PI — 本地启动器服务器 (CommonJS, SEA 兼容)
 *
 * 通过 HTTPS (https://localhost:3000) 提供加载项构建产物 (dist/)，
 * 以便作为 Office taskpane 加载项旁加载到 Excel 中。
 *
 * 增强功能:
 *  - 自动可信证书配置 (mkcert -> openssl -> PowerShell 回退)
 *  - 本地模型反向代理: https://localhost:3000/__lm__/<name>/<path>
 *    -> http://127.0.0.1:<port>/<path>  (解决 HTTPS->HTTP 混合内容阻止,
 *    支持 Ollama / LM Studio / vLLM / llama.cpp, 含 SSE 流式)
 *  - 本地模型自动发现 (探测常用端口) + JSON 状态端点
 *  - 自动生成 manifest.xml 指向本地 HTTPS 源
 *  - 自动复制清单到桌面便于"上传我的加载项"
 *  - CORS 代理 (端口 3003, 替代 npx pi-for-excel-proxy)
 *  - AI 配置测试端点 /__test_ai__
 *  - 自动 sideload: 注册清单 + 生成 sideload xlsx + 启动 Excel
 */

"use strict";

// 确保控制台输出使用 UTF-8 编码 (Windows 中文环境默认 GBK)
if (process.platform === "win32") {
  try {
    process.stdout.setDefaultEncoding("utf8");
    process.stderr.setDefaultEncoding("utf8");
  } catch {}
  // 设置控制台代码页为 UTF-8 (65001)
  try {
    const { execSync } = require("node:child_process");
    execSync("chcp 65001 >nul 2>&1", { shell: true, stdio: "ignore" });
  } catch {}
}

const https = require("node:https");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const net = require("node:net");
const { execFileSync, spawnSync } = require("node:child_process");
const { lookup: dnsLookup } = require("node:dns/promises");
const { Readable } = require("node:stream");
const crypto = require("node:crypto");
const zlib = require("node:zlib");

// ---------------------------------------------------------------------------
// Global error handlers — prevent crashes from uncaught exceptions in timers
// (e.g. EBUSY when Excel locks the sideload file from a previous run)
// ---------------------------------------------------------------------------
process.on("uncaughtException", (err) => {
  console.error("[联影AI] 未捕获的异常 (非致命, 服务器继续运行):", err.message);
  if (err.stack) console.error(err.stack);
});
process.on("unhandledRejection", (reason) => {
  console.error("[联影AI] 未处理的 Promise 拒绝 (非致命):", reason);
});

// ---------------------------------------------------------------------------
// SEA (Single Executable Application) bootstrap
// ---------------------------------------------------------------------------
// When this script is the SEA entry, the built dist/ is embedded as a gzip
// "dist.blob" asset. On first run we extract it to a per-user cache dir so the
// static server can serve it, and keep certs/data there too.
let SEA_INFO = null;
try {
  const sea = require("node:sea");
  if (sea.isSea && sea.isSea()) {
    SEA_INFO = sea;
  }
} catch {
  /* not running as SEA */
}

const SEA_CACHE_DIR = SEA_INFO
  ? path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local"), "UIH_AI_Base_PI")
  : null;

function extractDistBlob(sea, cacheDir) {
  const blobPath = path.join(cacheDir, "dist.blob");
  const versionPath = path.join(cacheDir, "dist.version");
  // Re-extract if blob or version missing.
  let needExtract = true;
  if (fs.existsSync(blobPath) && fs.existsSync(versionPath)) {
    try {
      const embedded = sea.getAsset("dist.version", "utf8");
      const cached = fs.readFileSync(versionPath, "utf8");
      needExtract = embedded !== cached;
    } catch {
      needExtract = true;
    }
  }
  if (!needExtract) return;

  fs.mkdirSync(cacheDir, { recursive: true });
  log("首次运行，正在提取内嵌的加载项资源...");
  const raw = Buffer.from(sea.getAsset("dist.blob")); // ArrayBuffer -> Buffer
  const data = zlib.gunzipSync(raw);
  if (data.slice(0, 8).toString("binary") !== "PIFXBLOB") {
    throw new Error("dist.blob: bad magic");
  }
  // Format: 12-byte magic "PIFXBLOB\0\0\0\0" + 4-byte BE header len + JSON + files
  const headerLen = data.readUInt32BE(12);
  const header = JSON.parse(data.slice(16, 16 + headerLen).toString("utf8"));
  const bodyStart = 16 + headerLen;
  const distDir = path.join(cacheDir, "dist");
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });
  for (const f of header.files) {
    const out = path.join(distDir, f.path);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, data.slice(bodyStart + f.offset, bodyStart + f.offset + f.length));
  }
  fs.writeFileSync(blobPath, raw);
  try {
    fs.writeFileSync(versionPath, sea.getAsset("dist.version", "utf8"));
  } catch {
    /* version asset optional */
  }
  log(`已提取 ${header.files.length} 个文件到 ${distDir}`);
}

if (SEA_INFO) {
  extractDistBlob(SEA_INFO, SEA_CACHE_DIR);
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const HOST = process.env.PI_HOST || "localhost";
const PORT = Number.parseInt(process.env.PI_PORT || "3000", 10);
const ORIGIN = `https://${HOST}:${PORT}`;

// Resolve directories. SEA -> per-user cache dir; otherwise folder layout.
const APP_DIR = SEA_INFO
  ? SEA_CACHE_DIR
  : process.env.PI_APP_DIR || path.dirname(process.argv[1] || __dirname);
const DIST_DIR = SEA_INFO
  ? path.join(SEA_CACHE_DIR, "dist")
  : process.env.PI_DIST_DIR || path.join(APP_DIR, "dist");
const CERT_DIR = SEA_INFO ? SEA_CACHE_DIR : process.env.PI_CERT_DIR || APP_DIR;
const DATA_DIR = SEA_INFO ? SEA_CACHE_DIR : process.env.PI_DATA_DIR || path.join(os.homedir(), ".pi-for-excel");

const KEY_PATH = path.join(CERT_DIR, "key.pem");
const CERT_PATH = path.join(CERT_DIR, "cert.pem");
const MANIFEST_PATH = path.join(APP_DIR, "manifest.local.xml");
const LOCAL_MODELS_PATH = path.join(DATA_DIR, "local-models.json");

// Common local OpenAI-compatible model servers to auto-discover.
const DISCOVERY_TARGETS = [
  { name: "ollama", url: "http://127.0.0.1:11434", apiPath: "/v1", probe: "/api/tags" },
  { name: "lmstudio", url: "http://127.0.0.1:1234", apiPath: "/v1", probe: "/v1/models" },
  { name: "vllm", url: "http://127.0.0.1:8000", apiPath: "/v1", probe: "/v1/models" },
  { name: "llamacpp", url: "http://127.0.0.1:8080", apiPath: "/v1", probe: "/v1/models" },
  { name: "koboldcpp", url: "http://127.0.0.1:5001", apiPath: "/v1", probe: "/v1/models" },
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

// CORS proxy port (must match frontend default: https://localhost:3003)
const PROXY_PORT = Number.parseInt(process.env.PI_PROXY_PORT || "3003", 10);
const PROXY_ORIGIN = `https://${HOST}:${PROXY_PORT}`;

// ---------------------------------------------------------------------------
// SSRF protection (ported from proxy-target-policy.mjs)
// ---------------------------------------------------------------------------
const LOOPBACK_IPV4 = new net.BlockList();
LOOPBACK_IPV4.addSubnet("127.0.0.0", 8, "ipv4");
const LOOPBACK_IPV6 = new net.BlockList();
LOOPBACK_IPV6.addAddress("::1", "ipv6");
const PRIVATE_LOCAL_IPV4 = new net.BlockList();
PRIVATE_LOCAL_IPV4.addSubnet("10.0.0.0", 8, "ipv4");
PRIVATE_LOCAL_IPV4.addSubnet("172.16.0.0", 12, "ipv4");
PRIVATE_LOCAL_IPV4.addSubnet("192.168.0.0", 16, "ipv4");
PRIVATE_LOCAL_IPV4.addSubnet("169.254.0.0", 16, "ipv4");
PRIVATE_LOCAL_IPV4.addSubnet("127.0.0.0", 8, "ipv4");
const PRIVATE_LOCAL_IPV6 = new net.BlockList();
PRIVATE_LOCAL_IPV6.addAddress("::1", "ipv6");
PRIVATE_LOCAL_IPV6.addSubnet("fc00::", 7, "ipv6");
PRIVATE_LOCAL_IPV6.addSubnet("fe80::", 10, "ipv6");
const IPV4_MAPPED_IPV6_RE = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i;

function normalizeHost(hostname) {
  if (typeof hostname !== "string") return "";
  let host = hostname.trim().toLowerCase();
  if (!host) return "";
  if (host.startsWith("[") && host.endsWith("]")) host = host.slice(1, -1);
  const zoneIndex = host.indexOf("%");
  if (zoneIndex >= 0) host = host.slice(0, zoneIndex);
  return host;
}
function isIpLiteral(hostname) {
  const host = normalizeHost(hostname);
  if (!host) return false;
  return net.isIP(host) !== 0;
}
function checkBlockList(list, ip) {
  const family = net.isIP(ip);
  if (family === 4) return list.check(ip, "ipv4");
  if (family === 6) return list.check(ip, "ipv6");
  return false;
}
function mappedIPv4FromIPv6(hostname) {
  const host = normalizeHost(hostname);
  const match = IPV4_MAPPED_IPV6_RE.exec(host);
  if (!match) return null;
  const candidate = match[1];
  return net.isIP(candidate) === 4 ? candidate : null;
}
function isLoopbackHostname(hostname) {
  const host = normalizeHost(hostname);
  if (!host) return false;
  if (host === "localhost") return true;
  if (checkBlockList(LOOPBACK_IPV4, host)) return true;
  if (checkBlockList(LOOPBACK_IPV6, host)) return true;
  const mapped = mappedIPv4FromIPv6(host);
  return mapped !== null && checkBlockList(LOOPBACK_IPV4, mapped);
}
function isPrivateOrLocalIp(ip) {
  const host = normalizeHost(ip);
  if (!host) return false;
  if (checkBlockList(PRIVATE_LOCAL_IPV4, host)) return true;
  if (checkBlockList(PRIVATE_LOCAL_IPV6, host)) return true;
  const mapped = mappedIPv4FromIPv6(host);
  return mapped !== null && checkBlockList(PRIVATE_LOCAL_IPV4, mapped);
}

// Default allowed target hosts for CORS proxy
const DEFAULT_ALLOWED_TARGET_HOSTS = new Set([
  "api.anthropic.com", "console.anthropic.com", "platform.claude.com",
  "github.com", "api.github.com",
  "auth.openai.com", "api.openai.com", "chatgpt.com",
  "oauth2.googleapis.com", "generativelanguage.googleapis.com",
  "cloudcode-pa.googleapis.com", "daily-cloudcode-pa.sandbox.googleapis.com",
  "api.z.ai",
  "s.jina.ai", "api.firecrawl.dev", "google.serper.dev", "api.tavily.com", "api.search.brave.com",
]);

const HOP_BY_HOP_HEADERS = new Set([
  "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
  "te", "trailer", "transfer-encoding", "upgrade",
]);

const DEFAULT_ALLOWED_ORIGINS = new Set([
  ORIGIN, PROXY_ORIGIN, "https://pi-for-excel.vercel.app",
]);

function evaluateTargetHostPolicy(hostname, resolvedIps, opts) {
  const allowLoopbackTargets = opts.allowLoopbackTargets || false;
  const allowPrivateTargets = opts.allowPrivateTargets || false;
  const allowedHosts = opts.allowedHosts || new Set();
  const host = normalizeHost(hostname);
  if (!host) return { allowed: false, reason: "blocked_target_invalid_host" };
  const loopback = isLoopbackHostname(host);
  if (loopback && !allowLoopbackTargets) return { allowed: false, reason: "blocked_target_loopback" };
  if (loopback && allowLoopbackTargets) return { allowed: true };
  const privateOrLocalLiteral = isIpLiteral(host) && isPrivateOrLocalIp(host);
  if (!allowPrivateTargets && privateOrLocalLiteral) return { allowed: false, reason: "blocked_target_private_ip" };
  if (allowPrivateTargets && privateOrLocalLiteral) return { allowed: true };
  if (allowedHosts.size > 0 && !allowedHosts.has(host)) return { allowed: false, reason: "blocked_target_not_allowlisted" };
  if (Array.isArray(resolvedIps) && resolvedIps.length > 0) {
    for (const ip of resolvedIps) {
      const normalized = normalizeHost(ip);
      if (!normalized) continue;
      const ipLoopback = isLoopbackHostname(normalized);
      if (ipLoopback && !allowLoopbackTargets) return { allowed: false, reason: "blocked_target_loopback" };
      if (ipLoopback && allowLoopbackTargets) continue;
      if (!allowPrivateTargets && isPrivateOrLocalIp(normalized)) return { allowed: false, reason: "blocked_target_private_ip" };
    }
  }
  return { allowed: true };
}

// ---------------------------------------------------------------------------
// Logging helpers
// ---------------------------------------------------------------------------
function log(...args) {
  console.log("[联影AI]", ...args);
}
function warn(...args) {
  console.warn("[联影AI]", ...args);
}

// ---------------------------------------------------------------------------
// Certificate provisioning
// ---------------------------------------------------------------------------
function isLoopback(addr) {
  if (!addr) return false;
  if (addr === "::1" || addr === "0:0:0:0:0:0:0:1") return true;
  if (addr.startsWith("127.")) return true;
  if (addr.startsWith("::ffff:127.")) return true;
  return false;
}

function tryMkcert() {
  try {
    // Ensure the local CA is installed (one-time, may prompt for admin).
    spawnSync("mkcert", ["-install"], { stdio: "ignore", shell: true });
    const out = spawnSync("mkcert", [HOST], { cwd: CERT_DIR, encoding: "utf8", shell: true });
    if (out.status !== 0) return false;
    // mkcert writes <host>.pem + <host>-key.pem
    const cert = path.join(CERT_DIR, `${HOST}.pem`);
    const key = path.join(CERT_DIR, `${HOST}-key.pem`);
    if (fs.existsSync(cert) && fs.existsSync(key)) {
      fs.copyFileSync(cert, CERT_PATH);
      fs.copyFileSync(key, KEY_PATH);
      return true;
    }
  } catch {
    /* fall through */
  }
  return false;
}

function tryOpenssl() {
  try {
    const keyOut = path.join(CERT_DIR, "skey.pem");
    const csrOut = path.join(CERT_DIR, "scsr.pem");
    const certOut = path.join(CERT_DIR, "scert.pem");
    const extOut = path.join(CERT_DIR, "sext.cnf");
    fs.writeFileSync(
      extOut,
      "subjectAltName=DNS:localhost,IP:127.0.0.1\nextendedKeyUsage=serverAuth\n",
    );
    let r;
    r = spawnSync("openssl", ["genrsa", "-out", keyOut, "2048"], { encoding: "utf8", shell: true });
    if (r.status !== 0) return false;
    r = spawnSync(
      "openssl",
      ["req", "-new", "-key", keyOut, "-out", csrOut, "-subj", "/CN=localhost"],
      { encoding: "utf8", shell: true },
    );
    if (r.status !== 0) return false;
    r = spawnSync(
      "openssl",
      ["x509", "-req", "-in", csrOut, "-signkey", keyOut, "-out", certOut, "-days", "825", "-extfile", extOut],
      { encoding: "utf8", shell: true },
    );
    if (r.status !== 0) return false;
    fs.copyFileSync(certOut, CERT_PATH);
    fs.copyFileSync(keyOut, KEY_PATH);
    return true;
  } catch {
    return false;
  }
}

function tryPowerShellCert() {
  // Last-resort: self-signed cert via PowerShell. NOT trusted by default —
  // the user must trust it. We emit guidance afterwards.
  try {
    const ps = `
$dir = '${CERT_DIR.replace(/\\/g, "\\")}'
$cert = New-SelfSignedCertificate -DnsName 'localhost' -CertStoreLocation 'Cert:\\CurrentUser\\My' -FriendlyName '联影AI_Base_PI (local)' -NotAfter (Get-Date).AddDays(825) -TextExtension @('2.5.29.17={text}DNS=localhost&IPAddress=127.0.0.1','2.5.29.37={text}1.3.6.1.5.5.7.3.1')
$pwd = ConvertTo-SecureString -String 'piforexcel' -Force -AsPlainText
Export-PfxCertificate -Cert $cert -FilePath (Join-Path $dir 'self.pfx') -Password $pwd | Out-Null
$proc = Start-Process -FilePath 'openssl' -ArgumentList 'pkcs12','-in',(Join-Path $dir 'self.pfx'),'-nocerts','-nodes','-passin','pass:piforexcel','-out',(Join-Path $dir 'skey.pem') -Wait -PassThru -NoNewWindow
$proc2 = Start-Process -FilePath 'openssl' -ArgumentList 'pkcs12','-in',(Join-Path $dir 'self.pfx'),'-clcerts','-nokeys','-passin','pass:piforexcel','-out',(Join-Path $dir 'scert.pem') -Wait -PassThru -NoNewWindow
Write-Output 'OK'
`;
    const r = spawnSync("powershell", ["-NoProfile", "-Command", ps], { encoding: "utf8", shell: true });
    if (r.stdout && r.stdout.includes("OK") && fs.existsSync(path.join(CERT_DIR, "scert.pem")) && fs.existsSync(path.join(CERT_DIR, "skey.pem"))) {
      fs.copyFileSync(path.join(CERT_DIR, "scert.pem"), CERT_PATH);
      fs.copyFileSync(path.join(CERT_DIR, "skey.pem"), KEY_PATH);
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}

function tryEmbeddedCerts() {
  if (!SEA_INFO) return false;
  try {
    const cert = Buffer.from(SEA_INFO.getAsset("cert.pem"));
    const key = Buffer.from(SEA_INFO.getAsset("key.pem"));
    if (cert && key) {
      fs.writeFileSync(CERT_PATH, cert);
      fs.writeFileSync(KEY_PATH, key);
      return true;
    }
  } catch {
    /* no embedded certs */
  }
  return false;
}

function ensureCerts() {
  if (fs.existsSync(KEY_PATH) && fs.existsSync(CERT_PATH)) {
    log("使用现有 HTTPS 证书:", CERT_PATH);
    return { ok: true, trusted: true, method: "existing" };
  }
  fs.mkdirSync(CERT_DIR, { recursive: true });
  if (tryEmbeddedCerts()) {
    log("使用内嵌的可信 HTTPS 证书。");
    return { ok: true, trusted: true, method: "embedded" };
  }
  log("正在为", HOST, "配置可信 HTTPS 证书");
  if (tryMkcert()) {
    log("证书已通过 mkcert 创建（已信任）。");
    return { ok: true, trusted: true, method: "mkcert" };
  }
  if (tryOpenssl()) {
    warn("证书已通过 openssl 创建（自签名，Excel 不信任）。");
    warn("要让 Excel 接受，请将其安装为受信任根证书，或安装 mkcert。");
    return { ok: true, trusted: false, method: "openssl" };
  }
  if (tryPowerShellCert()) {
    warn("证书已通过 PowerShell 创建（自签名，Excel 不信任）。");
    return { ok: true, trusted: false, method: "powershell" };
  }
  return { ok: false, trusted: false, method: "none" };
}

// ---------------------------------------------------------------------------
// Manifest generation
// ---------------------------------------------------------------------------
function generateManifest() {
  let xml;
  // Prefer an embedded manifest template (SEA asset), then a sibling file.
  if (SEA_INFO) {
    try {
      xml = SEA_INFO.getAsset("manifest.xml", "utf8");
    } catch {
      xml = null;
    }
  }
  if (!xml) {
    const templatePath = path.join(APP_DIR, "manifest.xml");
    if (fs.existsSync(templatePath)) {
      xml = fs.readFileSync(templatePath, "utf8");
    } else {
      xml = DEFAULT_MANIFEST.split("__ORIGIN__").join(ORIGIN);
    }
  }
  if (xml) {
    xml = xml.split("https://localhost:3000").join(ORIGIN);
  }
  fs.writeFileSync(MANIFEST_PATH, xml);
  return MANIFEST_PATH;
}

const DEFAULT_MANIFEST = `<?xml version="1.0" encoding="UTF-8"?>
<OfficeApp xmlns="http://schemas.microsoft.com/office/appforoffice/1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bt="http://schemas.microsoft.com/office/officeappbasictypes/1.0" xsi:type="TaskPaneApp">
  <Id>a1b2c3d4-e5f6-7890-abcd-ef1234567890</Id>
  <Version>1.0.0.0</Version>
  <ProviderName>联影AI_Base_PI</ProviderName>
  <DefaultLocale>zh-CN</DefaultLocale>
  <DisplayName DefaultValue="联影AI_Base_PI" />
  <Description DefaultValue="联影AI_Base_PI - 多模型 AI 侧边栏 Excel 加载项" />
  <IconUrl DefaultValue="__ORIGIN__/assets/icon-32.png" />
  <HighResolutionIconUrl DefaultValue="__ORIGIN__/assets/icon-80.png" />
  <Hosts><Host Name="Workbook" /></Hosts>
  <DefaultSettings><SourceLocation DefaultValue="__ORIGIN__/src/taskpane.html" /></DefaultSettings>
  <Permissions>ReadWriteDocument</Permissions>
</OfficeApp>`;

// ---------------------------------------------------------------------------
// Local-model config + discovery
// ---------------------------------------------------------------------------
function loadLocalModels() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    if (fs.existsSync(LOCAL_MODELS_PATH)) {
      let raw = fs.readFileSync(LOCAL_MODELS_PATH, "utf8");
      // Strip UTF-8 BOM (PowerShell `Set-Content -Encoding UTF8` adds one).
      if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
      return JSON.parse(raw);
    }
  } catch (e) {
    warn("无法解析 local-models.json:", e.message);
  }
  return {};
}

function saveLocalModels(cfg) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(LOCAL_MODELS_PATH, JSON.stringify(cfg, null, 2));
  } catch (e) {
    warn("无法保存 local-models.json:", e.message);
  }
}

function probeTarget(target) {
  return new Promise((resolve) => {
    const url = new URL(target.probe, target.url);
    const lib = url.protocol === "https:" ? https : http;
    const req = lib.get(
      url,
      { timeout: 1200, headers: { Accept: "application/json" } },
      (res) => {
        res.resume();
        res.on("end", () => resolve(res.statusCode && res.statusCode < 500));
      },
    );
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
    req.on("error", () => resolve(false));
  });
}

async function discoverLocalModels() {
  const cfg = loadLocalModels();
  let changed = false;
  log("正在扫描本地模型服务器...");
  for (const t of DISCOVERY_TARGETS) {
    const alive = await probeTarget(t);
    if (alive && !cfg[t.name]) {
      cfg[t.name] = { url: t.url, apiPath: t.apiPath };
      changed = true;
      log(`  已发现: ${t.name} -> ${t.url}`);
    } else if (!alive && cfg[t.name]) {
      // keep config even if currently down
    }
  }
  if (changed) saveLocalModels(cfg);
  return cfg;
}

// ---------------------------------------------------------------------------
// Local-model reverse proxy (solves HTTPS->HTTP mixed content, with SSE)
// ---------------------------------------------------------------------------
function forwardToTarget(req, res, targetBase, subPath) {
  let targetUrl;
  try {
    targetUrl = new URL(subPath, targetBase);
  } catch {
    res.statusCode = 400;
    res.end("bad proxy path");
    return;
  }
  const lib = targetUrl.protocol === "https:" ? https : http;

  // Collect request body (POST) — small JSON payloads; stream for large is
  // overkill for model chat requests.
  const chunks = [];
  req.on("data", (c) => chunks.push(c));
  req.on("end", () => {
    const body = Buffer.concat(chunks);
    const headers = { ...req.headers };
    // Strip hop-by-hop / origin headers so the upstream sees a clean request.
    for (const h of [
      "host", "origin", "referer", "content-length", "transfer-encoding",
      "connection", "keep-alive", "upgrade", "proxy-connection", "te", "trailer",
    ]) {
      delete headers[h];
    }
    if (body.length) headers["content-length"] = String(body.length);

    const upstream = lib.request(
      targetUrl,
      {
        method: req.method,
        headers,
        // Do not buffer on our side — pipe straight through for SSE streaming.
      },
      (upRes) => {
        res.writeHead(upRes.statusCode || 502, upRes.headers);
        upRes.pipe(res); // streams SSE chunks transparently
      },
    );
    upstream.on("error", (e) => {
      if (!res.headersSent) {
        res.statusCode = 502;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ error: "local model unreachable", detail: e.message, target: targetUrl.toString() }));
      } else {
        try { res.end(); } catch {}
      }
    });
    if (body.length) upstream.write(body);
    upstream.end();
  });
  req.on("error", () => {
    if (!res.headersSent) res.statusCode = 400;
    res.end();
  });
}

// ---------------------------------------------------------------------------
// Static file serving (dist/)
// ---------------------------------------------------------------------------
function safeJoin(base, reqPath) {
  const decoded = decodeURIComponent(reqPath);
  const cleaned = decoded.replace(/^\/+/, "");
  const full = path.resolve(base, cleaned);
  const rel = path.relative(base, full);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error("Path traversal");
  }
  return full;
}

function serveStatic(req, res, reqPath) {
  if (reqPath === "/") reqPath = "/src/taskpane.html";
  let filePath;
  try {
    filePath = safeJoin(DIST_DIR, reqPath);
  } catch {
    res.statusCode = 400;
    res.end("bad path");
    return;
  }
  // SPA-ish fallback: unknown html routes -> taskpane
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    // try index.html inside dir
    const idx = path.join(filePath, "index.html");
    if (fs.existsSync(idx)) {
      filePath = idx;
    } else if (reqPath.startsWith("/src/") || reqPath === "/src/taskpane.html") {
      filePath = path.join(DIST_DIR, "src", "taskpane.html");
      if (!fs.existsSync(filePath)) {
        res.statusCode = 404;
        res.end("taskpane.html not found in dist/. Run a build first.");
        return;
      }
    } else {
      res.statusCode = 404;
      res.end("not found");
      return;
    }
  }
  const ext = path.extname(filePath).toLowerCase();
  res.statusCode = 200;
  res.setHeader("content-type", MIME[ext] || "application/octet-stream");
  if (reqPath.startsWith("/assets/") && /-[A-Za-z0-9]{8,}\./.test(reqPath)) {
    res.setHeader("cache-control", "public, max-age=31536000, immutable");
  } else {
    res.setHeader("cache-control", "no-cache");
  }
  fs.createReadStream(filePath).pipe(res);
}

// ---------------------------------------------------------------------------
// CORS Proxy handler (ported from cors-proxy-server.mjs)
// ---------------------------------------------------------------------------
// Serves on port 3003 to match the frontend's default proxy URL.
// Format: https://localhost:3003/?url=<target-url>
// This eliminates the need for users to run `npx pi-for-excel-proxy`.
function extractProxyTargetUrl(rawUrl) {
  const idx = rawUrl.indexOf("url=");
  if (idx === -1) return null;
  const encoded = rawUrl.slice(idx + 4);
  const normalized = encoded.replace(/\+/g, "%20");
  try { return decodeURIComponent(normalized); } catch { return null; }
}

function buildOutboundHeaders(inHeaders) {
  const out = {};
  for (const [key, value] of Object.entries(inHeaders)) {
    if (!value) continue;
    const lower = key.toLowerCase();
    if (lower === "host" || lower === "content-length" || lower === "accept-encoding") continue;
    if (lower === "user-agent" || lower === "accept-language") continue;
    if (lower === "origin" || lower === "referer") continue;
    if (lower.startsWith("sec-fetch-") || lower.startsWith("sec-ch-")) continue;
    if (lower === "anthropic-dangerous-direct-browser-access") continue;
    if (lower === "cookie") continue;
    if (HOP_BY_HOP_HEADERS.has(lower)) continue;
    out[key] = value;
  }
  return out;
}

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  if (typeof origin === "string" && DEFAULT_ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", req.headers["access-control-request-headers"] || "*");
  res.setHeader("Access-Control-Expose-Headers", "*");
  res.setHeader("Access-Control-Max-Age", "86400");
}

async function corsProxyHandler(req, res) {
  const remote = req.socket && req.socket.remoteAddress;
  if (!isLoopback(remote)) {
    res.statusCode = 403; res.end("禁止访问"); return;
  }
  const origin = req.headers.origin;
  if (typeof origin === "string" && !DEFAULT_ALLOWED_ORIGINS.has(origin)) {
    res.statusCode = 403; res.end("禁止访问"); return;
  }
  setCorsHeaders(req, res);
  if (req.method === "OPTIONS") { res.statusCode = 204; res.end(); return; }

  // HEAD / (probe from frontend proxy-status.ts) — any response means "proxy is up"
  const rawUrl = req.url || "/";
  const target = extractProxyTargetUrl(rawUrl);
  if (!target) {
    // No ?url= param. Frontend probes with HEAD / to check if proxy is alive.
    // Return 400 (like the original) — any HTTP response = proxy is running.
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("缺少或无效的 ?url=<目标URL> 查询参数");
    return;
  }

  let targetUrl;
  try { targetUrl = new URL(target); } catch {
    res.statusCode = 400; res.end("无效的目标 URL"); return;
  }
  if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") {
    res.statusCode = 400; res.end("仅支持 http(s) 目标 URL"); return;
  }

  const targetHost = normalizeHost(targetUrl.hostname);
  let resolvedIps = [];
  if (!isIpLiteral(targetHost)) {
    try {
      const records = await dnsLookup(targetHost, { all: true, verbatim: true });
      resolvedIps = records.map(r => r.address);
    } catch { /* DNS fail — continue, policy will handle */ }
  }

  const policy = evaluateTargetHostPolicy(targetHost, resolvedIps, {
    allowLoopbackTargets: false,
    allowPrivateTargets: false,
    allowedHosts: DEFAULT_ALLOWED_TARGET_HOSTS,
  });
  if (!policy.allowed) {
    res.statusCode = 403;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(`${policy.reason}: 禁止访问`);
    return;
  }

  try {
    const headers = buildOutboundHeaders(req.headers);
    const hasBody = req.method && !["GET", "HEAD"].includes(req.method);
    const body = hasBody ? Readable.toWeb(req) : undefined;

    const upstream = await fetch(targetUrl.toString(), {
      method: req.method,
      headers,
      body,
      ...(body ? { duplex: "half" } : {}),
      redirect: "manual",
    });

    res.statusCode = upstream.status;
    upstream.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (lower === "set-cookie") return;
      if (HOP_BY_HOP_HEADERS.has(lower)) return;
      if (lower === "content-encoding") return;
      if (lower === "content-length") return;
      if (lower.startsWith("access-control-")) return;
      if (lower === "vary") return;
      res.setHeader(key, value);
    });

    if (!upstream.body) { res.end(); return; }
    const nodeStream = Readable.fromWeb(upstream.body);
    nodeStream.on("error", () => { try { res.end(); } catch {} });
    nodeStream.pipe(res);
  } catch (err) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(`Proxy error: ${err instanceof Error ? err.message : String(err)}`);
  }
}

// ---------------------------------------------------------------------------
// AI Test endpoint: /__test_ai__
// ---------------------------------------------------------------------------
// Tests an AI model configuration (cloud or local) by sending a simple
// "Hello" chat completion request and reporting success/failure.
async function handleAiTest(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ error: "方法不允许，请使用 POST 请求" }));
    return;
  }

  // Read request body
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const bodyStr = Buffer.concat(chunks).toString("utf8");

  let config;
  try {
    config = JSON.parse(bodyStr);
  } catch {
    res.statusCode = 400;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "无效的 JSON 请求体" }));
    return;
  }

  const { endpoint, apiKey, model } = config;
  if (!endpoint || !model) {
    res.statusCode = 400;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "请求体中缺少 'endpoint' 或 'model' 参数" }));
    return;
  }

  // Resolve endpoint: if it's a local proxy URL (/__lm__/<name>/...), 
  // resolve directly to the backend HTTP URL to avoid self-signed cert issues.
  let apiUrl = endpoint;
  const lmMatch = apiUrl.match(/\/__lm__\/([^/]+)/);
  if (lmMatch) {
    const lmName = lmMatch[1];
    const cfg = loadLocalModels();
    const entry = cfg[lmName];
    if (entry) {
      // The endpoint already includes the apiPath (e.g. /v1), so just use
      // entry.url + entry.apiPath as the base API URL directly.
      apiUrl = entry.url.replace(/\/+$/, "") + (entry.apiPath || "");
    } else {
      res.statusCode = 200;
      res.setHeader("content-type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ ok: false, error: `未知的本地模型: ${lmName}。可用模型: ${Object.keys(cfg).join(", ")}` }));
      return;
    }
  }

  // Build the chat completions URL
  if (!apiUrl.endsWith("/chat/completions")) {
    apiUrl = apiUrl.replace(/\/+$/, "") + "/chat/completions";
  }

  const testBody = JSON.stringify({
    model: model,
    messages: [{ role: "user", content: "Say 'hello' in one word." }],
    max_tokens: 10,
    stream: false,
  });

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const startedAt = Date.now();

    const upstream = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "Authorization": `Bearer ${apiKey}` } : {}),
      },
      body: testBody,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const elapsed = Date.now() - startedAt;

    const respText = await upstream.text();
    let respJson = null;
    try { respJson = JSON.parse(respText); } catch {}

    // Handle SSE responses (some servers ignore stream:false)
    const contentType = upstream.headers.get("content-type") || "";
    if (contentType.includes("text/event-stream") && !respJson) {
      let sseReply = "";
      for (const line of respText.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data: ") || trimmed === "data: [DONE]") continue;
        try {
          const chunk = JSON.parse(trimmed.slice(6));
          if (chunk.choices && chunk.choices[0]) {
            const delta = chunk.choices[0].delta || chunk.choices[0].message;
            if (delta && delta.content) sseReply += delta.content;
          }
        } catch {}
      }
      res.statusCode = 200;
      res.setHeader("content-type", "application/json; charset=utf-8");
      res.end(JSON.stringify({
        ok: true,
        status: upstream.status,
        model: model,
        reply: sseReply.trim() || "(empty response)",
        latency_ms: elapsed,
      }));
      return;
    }

    if (upstream.ok) {
      // Extract the assistant's reply
      let reply = "";
      if (respJson && respJson.choices && respJson.choices[0]) {
        const msg = respJson.choices[0].message || respJson.choices[0].delta;
        reply = msg ? (msg.content || "") : "";
      }
      res.statusCode = 200;
      res.setHeader("content-type", "application/json; charset=utf-8");
      res.end(JSON.stringify({
        ok: true,
        status: upstream.status,
        model: model,
        reply: reply.trim(),
        latency_ms: elapsed,
      }));
    } else {
      res.statusCode = 200;
      res.setHeader("content-type", "application/json; charset=utf-8");
      res.end(JSON.stringify({
        ok: false,
        status: upstream.status,
        error: respJson && respJson.error ? (respJson.error.message || respJson.error) : respText.slice(0, 500),
        latency_ms: elapsed,
      }));
    }
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    const isAbort = err.name === "AbortError";
    res.statusCode = 200;
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify({
      ok: false,
      error: isAbort ? "请求超时 (15秒)" : errMsg,
    }));
  }
}

// ---------------------------------------------------------------------------
// HTTP handler
// ---------------------------------------------------------------------------
function handler(req, res) {
  const remote = req.socket && req.socket.remoteAddress;
  if (!isLoopback(remote)) {
    res.statusCode = 403;
    res.end("forbidden");
    return;
  }
  const url = new URL(req.url || "/", ORIGIN);
  const reqPath = url.pathname;

  // --- Local-model proxy: /__lm__/<name>/<rest...> ---
  if (reqPath === "/__lm__" || reqPath === "/__lm__/") {
    const cfg = loadLocalModels();
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ origin: ORIGIN, localModels: cfg, hint: "Set your custom gateway endpoint to " + ORIGIN + "/__lm__/<name>/v1" }, null, 2));
    return;
  }
  if (reqPath.startsWith("/__lm__/")) {
    const rest = reqPath.slice("/__lm__/".length);
    const slash = rest.indexOf("/");
    if (slash === -1) {
      // /__lm__/<name> with no sub-path -> return config / status
      const cfg = loadLocalModels();
      res.setHeader("content-type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ origin: ORIGIN, localModels: cfg, hint: "Set your custom gateway endpoint to " + ORIGIN + "/__lm__/<name>/v1" }, null, 2));
      return;
    }
    const name = rest.slice(0, slash);
    const subPath = rest.slice(slash + 1);
    const cfg = loadLocalModels();
    const entry = cfg[name];
    if (!entry) {
      res.statusCode = 404;
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ error: "unknown local model", name, available: Object.keys(cfg) }));
      return;
    }
    const base = entry.url.replace(/\/+$/, "") + (entry.apiPath || "");
    forwardToTarget(req, res, base, "/" + subPath);
    return;
  }

  // --- Status / discovery endpoint ---
  if (reqPath === "/__status__") {
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ ok: true, origin: ORIGIN, dist: fs.existsSync(DIST_DIR), localModels: loadLocalModels(), proxy: PROXY_ORIGIN }, null, 2));
    return;
  }

  // --- AI test endpoint: /__test_ai__ ---
  if (reqPath === "/__test_ai__") {
    handleAiTest(req, res);
    return;
  }

  serveStatic(req, res, reqPath);
}

// ---------------------------------------------------------------------------
// Auto-sideload: register manifest + launch Excel with the add-in loaded
// ---------------------------------------------------------------------------
// This eliminates the need for the user to manually upload the manifest.
// Steps:
//   1. Register the manifest path in the Office developer registry key.
//   2. Generate a sideload .xlsx from the embedded template, replacing the
//      placeholder add-in ID and version with the real values.
//   3. Launch Excel to open the sideload file, which auto-opens the taskpane.
// ---------------------------------------------------------------------------

const DEVELOPER_REGISTRY_KEY = "HKCU\\SOFTWARE\\Microsoft\\Office\\16.0\\Wef\\Developer";

function parseManifestIdAndVersion(manifestXml) {
  const idMatch = manifestXml.match(/<Id>([^<]+)<\/Id>/);
  const verMatch = manifestXml.match(/<Version>([^<]+)<\/Version>/);
  return {
    id: idMatch ? idMatch[1].trim() : null,
    version: verMatch ? verMatch[1].trim() : null,
  };
}

function registerManifestInRegistry(addinId, manifestPath) {
  try {
    // Use reg.exe to register the manifest path under the developer key.
    // Value name = add-in ID, value data = manifest file path.
    const args = [
      "add", DEVELOPER_REGISTRY_KEY,
      "/v", addinId,
      "/t", "REG_SZ",
      "/d", manifestPath,
      "/f",
    ];
    const result = spawnSync("reg", args, { encoding: "utf8", shell: true });
    if (result.status === 0) {
      log("清单已注册到 Office 开发者注册表 (ID: " + addinId + ")");
      return true;
    } else {
      warn("注册表注册返回状态 " + result.status + ": " + (result.stderr || "").trim());
      return false;
    }
  } catch (e) {
    warn("无法在注册表中注册清单:", e.message);
    return false;
  }
}

function generateSideloadXlsx(addinId, addinVersion) {
  // Read the template xlsx (from SEA asset or filesystem)
  let templateData;
  if (SEA_INFO) {
    try {
      templateData = Buffer.from(SEA_INFO.getAsset("ExcelWorkbookWithTaskPane.xlsx"));
    } catch {
      warn("无法读取内嵌的 sideload 模板。");
      return null;
    }
  } else {
    const templatePath = path.join(APP_DIR, "ExcelWorkbookWithTaskPane.xlsx");
    if (!fs.existsSync(templatePath)) {
      warn("未找到 sideload 模板:", templatePath);
      return null;
    }
    templateData = fs.readFileSync(templatePath);
  }

  // Write template to a temp file — use timestamp to avoid EBUSY when Excel
  // still has the previous sideload file locked from a prior run.
  const tmpDir = os.tmpdir();
  const ts = Date.now();
  const sideloadPath = path.join(tmpDir, `UIH_AI_Base_PI-sideload-${ts}.xlsx`);
  try {
    fs.writeFileSync(sideloadPath, templateData);
  } catch (e) {
    warn("无法写入 sideload 文件:", e.message);
    return null;
  }

  // Use PowerShell + .NET ZipFile to modify the webextension.xml inside the xlsx
  // Write the script to a temp .ps1 file to avoid -Command multiline issues
  const psScriptPath = path.join(tmpDir, "pi-sideload-gen.ps1");
  const psScript = [
    "Add-Type -AssemblyName System.IO.Compression",
    "Add-Type -AssemblyName System.IO.Compression.FileSystem",
    "$xlsxPath = '" + sideloadPath.replace(/'/g, "''") + "'",
    "$addinId = '" + addinId + "'",
    "$addinVer = '" + addinVersion + "'",
    "$zip = [System.IO.Compression.ZipFile]::Open($xlsxPath, [System.IO.Compression.ZipArchiveMode]::Update)",
    "try {",
    "  $entry = $zip.GetEntry('xl/webextensions/webextension.xml')",
    "  if ($entry) {",
    "    $reader = New-Object System.IO.StreamReader($entry.Open(), [System.Text.Encoding]::UTF8)",
    "    $content = $reader.ReadToEnd()",
    "    $reader.Close()",
    "    $content = $content -replace '00000000-0000-0000-0000-000000000000', $addinId",
    "    $content = $content -replace '1\\.0\\.0\\.0', $addinVer",
    "    $entry.Delete()",
    "    $newEntry = $zip.CreateEntry('xl/webextensions/webextension.xml')",
    "    $writer = New-Object System.IO.StreamWriter($newEntry.Open(), [System.Text.Encoding]::UTF8)",
    "    $writer.Write($content)",
    "    $writer.Close()",
    "  } else {",
    "    Write-Error 'webextension.xml not found in template'",
    "    exit 1",
    "  }",
    "} finally {",
    "  $zip.Dispose()",
    "}",
    "Write-Output 'OK'",
  ].join("\r\n");
  fs.writeFileSync(psScriptPath, psScript, "utf8");

  try {
    const result = spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", psScriptPath], {
      encoding: "utf8",
      shell: true,
      timeout: 15000,
    });
    // Clean up the temp script
    try { fs.unlinkSync(psScriptPath); } catch {}
    if (result.status === 0 && (result.stdout || "").includes("OK")) {
      log("已生成 sideload xlsx 文件:", sideloadPath);
      return sideloadPath;
    } else {
      warn("生成 sideload xlsx 失败:", (result.stderr || "").trim());
      return null;
    }
  } catch (e) {
    try { fs.unlinkSync(psScriptPath); } catch {}
    warn("PowerShell sideload 生成错误:", e.message);
    return null;
  }
}

function launchExcelWithSideload(sideloadPath) {
  try {
    // Use PowerShell Start-Process to open the xlsx with the default app (Excel)
    const psScript = `Start-Process -FilePath '${sideloadPath.replace(/'/g, "''")}'`;
    spawnSync("powershell", ["-NoProfile", "-Command", psScript], {
      encoding: "utf8",
      shell: true,
      timeout: 10000,
    });
    log("已启动 Excel 并加载 sideload 文件。");
    return true;
  } catch (e) {
    warn("无法启动 Excel:", e.message);
    return false;
  }
}

function autoSideload(manifestPath) {
  const manifestXml = fs.readFileSync(manifestPath, "utf8");
  const { id, version } = parseManifestIdAndVersion(manifestXml);
  if (!id) {
    warn("无法从清单中解析加载项 ID；跳过自动 sideload。");
    return false;
  }

  log("正在自动加载 联影AI_Base_PI 到 Excel...");

  // Step 1: Register manifest in registry
  registerManifestInRegistry(id, manifestPath);

  // Step 2: Generate sideload xlsx
  const sideloadPath = generateSideloadXlsx(id, version || "1.0.0.0");
  if (!sideloadPath) {
    warn("Sideload 文件生成失败。您仍可通过 插入 > 我的加载项 手动加载。");
    return false;
  }

  // Step 3: Launch Excel with the sideload file
  launchExcelWithSideload(sideloadPath);

  return true;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("\n======================================================");
  console.log("  联影AI_Base_PI — 本地启动器");
  console.log("======================================================\n");

  // 1. dist check
  if (!fs.existsSync(DIST_DIR)) {
    warn("未找到 dist/ 目录:", DIST_DIR);
    warn("加载项构建缺失。如果您运行的是打包的 EXE，");
    warn("内嵌资源可能未正确提取。正在退出。");
    process.exit(1);
  }

  // 2. certs
  const certInfo = ensureCerts();
  if (!certInfo.ok) {
    warn("无法配置 HTTPS 证书。请安装 mkcert");
    warn("  (choco install mkcert 或 scoop install mkcert) 后重新运行。");
    process.exit(1);
  }

  // 3. manifest
  const manifestFile = generateManifest();
  log("清单已写入:", manifestFile);

  // 4. discover local models (non-blocking on startup, but await briefly)
  const localModels = await discoverLocalModels();

  // 5. start main server (port 3000 — static files + local model proxy + AI test)
  const server = https.createServer(
    { key: fs.readFileSync(KEY_PATH), cert: fs.readFileSync(CERT_PATH) },
    handler,
  );
  server.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
      warn(`Port ${PORT} is already in use. Close other instances (or set PI_PORT).`);
    } else {
      warn("服务器错误:", e.message);
    }
    process.exit(1);
  });
  server.listen(PORT, "::", () => {
    printInstructions(manifestFile, certInfo, localModels);
    // Auto-sideload: register manifest + launch Excel with the add-in
    // Give the server a brief moment to be fully ready before launching Excel
    setTimeout(() => {
      try {
        autoSideload(manifestFile);
      } catch (e) {
        warn("自动 sideload 失败 (非致命):", e.message);
        warn("您可通过 Excel > 插入 > 我的加载项 手动加载。");
      }
    }, 1500);
  });

  // 6. start CORS proxy server (port 3003 — eliminates need for npx pi-for-excel-proxy)
  const proxyServer = https.createServer(
    { key: fs.readFileSync(KEY_PATH), cert: fs.readFileSync(CERT_PATH) },
    corsProxyHandler,
  );
  proxyServer.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
      warn(`CORS 代理端口 ${PROXY_PORT} 已被占用 (可能有其他代理正在运行)。`);
      warn(`The "Proxy not running" banner may appear. Close the other process and re-run.`);
    } else {
      warn("CORS 代理错误:", e.message);
    }
    // Don't exit — the main server is still functional
  });
  proxyServer.listen(PROXY_PORT, "::", () => {
    log(`CORS 代理已启动: ${PROXY_ORIGIN} (消除 "Proxy not running" 提示)`);
  });
}

function printInstructions(manifestFile, certInfo, localModels) {
  const desktop = path.join(os.homedir(), "Desktop");
  let manifestOnDesktop = manifestFile;
  try {
    const dest = path.join(desktop, "UIH_AI_Base_PI-manifest.xml");
    fs.copyFileSync(manifestFile, dest);
    manifestOnDesktop = dest;
  } catch {
    /* Desktop may not exist; ignore */
  }

  console.log("\n------------------------------------------------------");
  console.log("  服务器运行中");
  console.log("------------------------------------------------------");
  console.log("  加载项地址 : " + ORIGIN + "/src/taskpane.html");
  console.log("  清单文件   : " + manifestOnDesktop);
  console.log("  状态检查   : " + ORIGIN + "/__status__");
  console.log("  AI 测试    : POST " + ORIGIN + "/__test_ai__");
  console.log("  CORS 代理  : " + PROXY_ORIGIN + " (已自动启动)");
  console.log("");
  console.log("  证书状态   : " + (certInfo.trusted ? "已信任 (" + certInfo.method + ")" : "自签名 (" + certInfo.method + ") — Excel 可能拒绝"));
  console.log("");
  console.log("  >> 所有服务已自动启动 — 无需手动配置:");
  console.log("     - HTTPS 加载项服务器 (端口 3000)");
  console.log("     - CORS 代理 (端口 3003, 替代 npx pi-for-excel-proxy)");
  console.log("     - Excel 自动启动并加载联影AI 侧边栏");
  console.log("");
  console.log("  >> 本地 / 自定义模型:");
  const names = Object.keys(localModels);
  if (names.length) {
    console.log("  已发现的本地模型服务器:");
    for (const n of names) {
      console.log("     - " + n + " : " + ORIGIN + "/__lm__/" + n + "/v1");
    }
    console.log("");
    console.log("  在 联影AI -> /settings -> 自定义 OpenAI 兼容网关:");
    console.log("     Endpoint : " + ORIGIN + "/__lm__/<name>/v1");
    console.log("     模型     : <模型 ID, 如 llama3.1, qwen2.5 ...>");
    console.log("     API 密钥 : (任意值, 如 'local')");
  } else {
    console.log("  未检测到本地模型服务器。请启动 Ollama / LM Studio / vLLM");
    console.log("  后重新运行，或手动添加到: " + LOCAL_MODELS_PATH);
    console.log("  然后将网关端点设为: " + ORIGIN + "/__lm__/<name>/v1");
  }
  console.log("");
  console.log("  >> 云端模型 (OpenAI/Anthropic/Gemini)，请使用 /login 并输入 API 密钥。");
  console.log("");
  console.log("  使用联影AI_Base_PI 期间请保持此窗口打开。");
  console.log("  按 Ctrl+C 停止。\n");
}

main().catch((e) => {
  console.error("[联影AI] 致命错误:", e);
  process.exit(1);
});
