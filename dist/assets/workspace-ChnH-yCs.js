const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/app-storage-Dm8sjFlO.js","assets/chunk-aKtaBQYM.js"])))=>i.map(i=>d[i]);
import{n as e}from"./chunk-aKtaBQYM.js";import{S as t,at as n}from"./register-components-Cy2CfCvT.js";import{t as r}from"./test-raw-markdown-glob-CjJeF-vm.js";function i(){try{let e=globalThis.Office;if(!e||typeof e!=`object`)return null;let t=e.context;if(!t||typeof t!=`object`)return null;let n=t.document;if(!n||typeof n!=`object`)return null;let r=n.url;return typeof r==`string`&&r.trim().length>0?r:null}catch{return null}}function a(e){return[...new Uint8Array(e)].map(e=>e.toString(16).padStart(2,`0`)).join(``)}function o(e){return e.split(/[?#]/,1)[0]?.trim()??``}function s(e){let t=e=>{let t=o(e);if(!t)return null;try{let e=decodeURIComponent(t).trim();return e.length>0?e:null}catch{return t.length>0?t:null}};try{let n=new URL(e).pathname.replace(/\\/g,`/`).split(`/`).at(-1);if(n){let e=t(n);if(e)return e}}catch{}let n=e.replace(/\\/g,`/`).split(`/`).at(-1);return n?t(n):null}function c(e){let t=e.trim();if(t.length===0)return t;try{let e=new URL(t);return e.search=``,e.hash=``,e.pathname=e.pathname.replace(/\\/g,`/`),e.toString()}catch{return o(t).replace(/\\/g,`/`)}}function l(e){return e.workbookName?e.workbookName:e.workbookId?`Workbook (${e.workbookId.slice(0,18)}…)`:`Current workbook`}function u(e){let t=2166136261;for(let n of e)t^=n,t=Math.imul(t,16777619);return(t>>>0).toString(16).padStart(8,`0`)}async function ee(e){let t=new TextEncoder().encode(e),n=globalThis.crypto?.subtle;if(n?.digest)try{return a(await n.digest(`SHA-256`,t))}catch{}return u(t)}async function d(){let e=i();return e?{workbookId:`url_sha256:${await ee(c(e))}`,workbookName:s(e),source:`document.url`}:{workbookId:null,workbookName:null,source:`unknown`}}var te=new TextEncoder,ne=new TextDecoder;function f(e){return te.encode(e)}function p(e){return ne.decode(e)}function m(e){let t=``,n=16384;for(let r=0;r<e.length;r+=n){let i=e.subarray(r,r+n);for(let e of i)t+=String.fromCharCode(e)}return btoa(t)}function h(e){let t=e.trim();if(t.length===0)return new Uint8Array;let n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;e+=1)r[e]=n.charCodeAt(e);return r}function re(e,t){return t<=0?{text:``,truncated:e.length>0}:e.length<=t?{text:e,truncated:!1}:{text:e.slice(0,t),truncated:!0}}function g(e,t){return t<=0?{base64:``,truncated:e.length>0}:e.length<=t?{base64:e,truncated:!1}:{base64:e.slice(0,t),truncated:!0}}var ie=[`text/`],ae=new Set([`application/json`,`application/xml`,`application/javascript`,`application/x-javascript`,`application/x-yaml`,`application/yaml`,`application/x-sh`,`application/sql`,`application/toml`,`application/x-httpd-php`]),oe={txt:`text/plain`,md:`text/markdown`,markdown:`text/markdown`,csv:`text/csv`,tsv:`text/tab-separated-values`,json:`application/json`,yaml:`application/yaml`,yml:`application/yaml`,xml:`application/xml`,html:`text/html`,htm:`text/html`,css:`text/css`,js:`application/javascript`,mjs:`application/javascript`,ts:`text/plain`,py:`text/plain`,sh:`application/x-sh`,sql:`application/sql`,toml:`application/toml`,ini:`text/plain`,log:`text/plain`,pdf:`application/pdf`,png:`image/png`,jpg:`image/jpeg`,jpeg:`image/jpeg`,webp:`image/webp`,gif:`image/gif`,svg:`image/svg+xml`,docx:`application/vnd.openxmlformats-officedocument.wordprocessingml.document`,pptx:`application/vnd.openxmlformats-officedocument.presentationml.presentation`,xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`};function se(e){let t=e.lastIndexOf(`.`);return t<=0||t===e.length-1?``:e.slice(t+1).toLowerCase()}function _(e,t){let n=t?.trim();if(n)return n;let r=se(e);return r?oe[r]??`application/octet-stream`:`application/octet-stream`}function v(e){let t=e.trim().toLowerCase();return t?ae.has(t)?!0:ie.some(e=>t.startsWith(e)):!1}function y(e,t){return v(_(e,t))?`text`:`binary`}function ce(e){if(!Number.isFinite(e)||e<0)return`0 B`;if(e<1024)return`${e} B`;let t=e/1024;if(t<1024)return`${t.toFixed(t>=100?0:t>=10?1:2)} KB`;let n=t/1024;if(n<1024)return`${n.toFixed(n>=100?0:n>=10?1:2)} MB`;let r=n/1024;return`${r.toFixed(r>=100?0:r>=10?1:2)} GB`}function b(e){let t=e.trim();if(t.length===0)throw Error(`Path 是必填项。`);let n=t.replaceAll(`\\`,`/`);if(n.startsWith(`/`))throw Error(`Path must be relative to the workspace root.`);let r=n.split(`/`).map(e=>e.trim()).filter(e=>e.length>0);if(r.length===0)throw Error(`Path 是必填项。`);for(let e of r){if(e===`.`||e===`..`)throw Error(`Path cannot contain '.' or '..' segments.`);if(e.includes(`\0`))throw Error(`Path contains invalid characters.`)}return r.join(`/`)}function x(e){return b(e).split(`/`)}function S(e){let t=x(e);return t[t.length-1]??e}async function C(e){let t=await e.arrayBuffer();return new Uint8Array(t)}function le(e){let t=new ArrayBuffer(e.byteLength);return new Uint8Array(t).set(e),t}function ue(e,t){let n=_(t.name,t.type);return{path:e,name:t.name,size:t.size,modifiedAt:t.lastModified,mimeType:n,kind:y(t.name,n),sourceKind:`workspace`,readOnly:!1}}function de(e,t,n){let r=ue(e,t);return r.kind===`text`?{...r,text:p(n)}:{...r,base64:m(n)}}async function fe(e){let t=e.root;for(let n=0;n<e.pathParts.length-1;n+=1){let r=e.pathParts[n];t=await t.getDirectoryHandle(r,{create:e.createDirectories})}return t}async function w(e){let t=x(b(e.path)),n=t[t.length-1];if(!n)throw Error(`Path must include a file name.`);return(await fe({root:e.root,pathParts:t,createDirectories:e.createDirectories})).getFileHandle(n,{create:e.createFile})}async function T(e,t){let n=x(b(t)),r=n[n.length-1];if(!r)throw Error(`Path must include a file name.`);await(await fe({root:e,pathParts:n,createDirectories:!1})).removeEntry(r,{recursive:!1})}async function E(e){for await(let[t,n]of e.root.entries()){let r=e.pathPrefix.length>0?`${e.pathPrefix}/${t}`:t;if(n.kind===`file`){let t=await n.getFile();e.out.push(ue(r,t));continue}n.kind===`directory`&&await E({root:n,pathPrefix:r,out:e.out})}}function D(e){return e.sort((e,t)=>e.path.localeCompare(t.path))}var O=class{constructor(e){this.kind=`native-directory`,this.label=`Local folder`,this.root=e}async listFiles(){let e=[];return await E({root:this.root,pathPrefix:``,out:e}),D(e)}async readFile(e){let t=b(e),n=await(await w({root:this.root,path:t,createFile:!1,createDirectories:!1})).getFile();return de(t,n,await C(n))}async writeBytes(e,t,n){let r=b(e),i=await(await w({root:this.root,path:r,createFile:!0,createDirectories:!0})).createWritable();await i.write(le(t)),await i.close()}async deleteFile(e){await T(this.root,e)}async renameFile(e,t){let n=b(e),r=b(t);if(n===r)return;let i=await(await w({root:this.root,path:n,createFile:!1,createDirectories:!1})).getFile(),a=await C(i);await this.writeBytes(r,a,_(S(r),i.type)),await this.deleteFile(n)}};async function k(){let e=navigator.storage;if(!e||typeof e.getDirectory!=`function`)throw Error(`Origin Private File System is not available in this environment.`);return e.getDirectory()}var A=class{constructor(){this.kind=`opfs`,this.label=`Sandboxed workspace`}async listFiles(){let e=await k(),t=[];return await E({root:e,pathPrefix:``,out:t}),D(t)}async readFile(e){let t=await k(),n=b(e),r=await(await w({root:t,path:n,createFile:!1,createDirectories:!1})).getFile();return de(n,r,await C(r))}async writeBytes(e,t,n){let r=await(await w({root:await k(),path:b(e),createFile:!0,createDirectories:!0})).createWritable();await r.write(le(t)),await r.close()}async deleteFile(e){await T(await k(),e)}async renameFile(e,t){let n=b(e),r=b(t);if(n===r)return;let i=await this.readFile(n);if(!i.base64&&!i.text)throw Error(`Could not read file during rename.`);let a=i.base64?h(i.base64):f(i.text??``);await this.writeBytes(r,a,i.mimeType),await this.deleteFile(n)}},j=class{constructor(){this.kind=`memory`,this.label=`Session memory`,this.files=new Map}listFiles(){let e=[];for(let[t,n]of this.files){let r=S(t);e.push({path:t,name:r,size:n.bytes.byteLength,modifiedAt:n.modifiedAt,mimeType:n.mimeType,kind:y(r,n.mimeType),sourceKind:`workspace`,readOnly:!1})}return Promise.resolve(D(e))}readFile(e){let t=b(e),n=this.files.get(t);if(!n)return Promise.reject(Error(`File not found: ${t}`));let r=S(t),i=y(r,n.mimeType);return i===`text`?Promise.resolve({path:t,name:r,size:n.bytes.byteLength,modifiedAt:n.modifiedAt,mimeType:n.mimeType,kind:i,sourceKind:`workspace`,readOnly:!1,text:p(n.bytes)}):Promise.resolve({path:t,name:r,size:n.bytes.byteLength,modifiedAt:n.modifiedAt,mimeType:n.mimeType,kind:i,sourceKind:`workspace`,readOnly:!1,base64:m(n.bytes)})}writeBytes(e,t,n){let r=b(e),i=S(r);return this.files.set(r,{bytes:t,mimeType:_(i,n),modifiedAt:Date.now()}),Promise.resolve()}deleteFile(e){let t=b(e);return this.files.delete(t),Promise.resolve()}renameFile(e,t){let n=b(e),r=b(t);if(n===r)return Promise.resolve();let i=this.files.get(n);return i?(this.files.delete(n),this.files.set(r,{bytes:i.bytes,mimeType:_(S(r),i.mimeType),modifiedAt:Date.now()}),Promise.resolve()):Promise.reject(Error(`File not found: ${n}`))}},pe=`# 联影AI_Base_PI

Open-source, multi-model AI sidebar add-in for Microsoft Excel. 由联影AI 驱动.

联影AI_Base_PI is an AI agent that lives inside Excel. It reads your workbook, makes changes, and does research — using any model you choose. Bring your own API key or OAuth login for Anthropic, OpenAI, Google Gemini, or GitHub Copilot.

## Features

**Core spreadsheet tools** — 16 built-in tools that the AI can call to interact with your workbook:

| Tool | What it does |
|---|---|
| \`get_workbook_overview\` | Structural blueprint — sheets, headers, named ranges, tables, charts, pivots |
| \`read_range\` | Read cells in compact (markdown), CSV, or detailed (with formatting) mode |
| \`write_cells\` | Write values/formulas with overwrite protection and auto-verification |
| \`fill_formula\` | AutoFill a formula across a range (relative refs adjust automatically) |
| \`search_workbook\` | Find text, values, or formula references across all sheets |
| \`modify_structure\` | Insert/delete rows/columns, add/rename/delete/hide sheets |
| \`format_cells\` | Apply formatting — fonts, colors, number formats, borders, named styles |
| \`conditional_format\` | Add or clear conditional formatting rules |
| \`trace_dependencies\` | Trace formula lineage (precedents upstream or dependents downstream) |
| \`explain_formula\` | Plain-language formula explanation with cited cell references |
| \`view_settings\` | Gridlines, headings, freeze panes, tab color, sheet visibility |
| \`comments\` | Read, add, update, reply, resolve/reopen cell comments |
| \`workbook_history\` | List/restore automatic in-between-saves backups for workbook mutations |
| \`instructions\` | Persistent user-level and workbook-level guidance for the AI |
| \`conventions\` | Configurable formatting defaults (currency, negatives, zeros, decimal places) |
| \`skills\` | Bundled Agent Skills for task-specific workflows |

**Multi-model support** — use any supported provider; switch models mid-conversation:
- **Anthropic** (Claude) — API key or OAuth
- **OpenAI** / **OpenAI Codex** — API key
- **Google Gemini** — API key
- **GitHub Copilot** — OAuth
- **Custom OpenAI-compatible gateways** — configure endpoint + model + API key in \`/settings\`

**Session management** — multiple session tabs per workbook, auto-save/restore, session history, \`/resume\` to pick up where you left off.

**Auto-context injection** — the AI automatically receives the workbook blueprint, your current selection, and recent cell changes before every turn. No need to manually describe what you're looking at.

**Workbook recovery** — automatic checkpoints before every mutation. One-click revert from the sidebar if something goes wrong.

**Formatting conventions** — define your house style once (currency symbol, negative style, decimal places) and the AI follows it automatically.

**Slash commands** — \`/model\`, \`/login\`, \`/settings\`, \`/rules\`, \`/extensions\`, \`/tools\`, \`/export\`, \`/compact\`, \`/new\`, \`/resume\`, \`/history\`, \`/shortcuts\`, and more.

**Extensions** — install sidebar extensions (mini-apps) from chat. The AI can generate and install extension code directly via the \`extensions_manager\` tool. Extensions run in an iframe sandbox by default.

**Integrations** — opt-in external tool integrations:
- **Web Search** (Jina default, Serper/Tavily/Brave) + \`fetch_page\` — find and read external sources without leaving Excel
- **MCP Gateway** — connect to user-configured MCP servers for custom tool access

**Bridge + advanced controls** (managed via \`/experimental\`):
- Tmux bridge settings — configure bridge URL/token and run health checks
- Python / LibreOffice bridge settings — configure bridge URL/token
- Files workspace write/delete gate — shared artifact storage across sessions (assistant built-in docs under \`assistant-docs/\` are always available read-only)
- Advanced extension controls — remote URL opt-in, permission enforcement, sandbox rollback, and Widget API v2

(Web Search + MCP are managed in \`/tools\`, or \`/extensions\` → Connections.)

## Install

1. Download [\`manifest.prod.xml\`](https://pi-for-excel.vercel.app/manifest.prod.xml)
2. Add it to Excel — see [**install guide**](docs/install.md) for step-by-step instructions (macOS + Windows)
3. Click **打开联影AI** in the ribbon
4. Connect a provider (API key or OAuth), or configure a custom OpenAI-compatible gateway in \`/settings\`
5. Start chatting — try \`What sheets do I have?\` or \`Summarize my current selection\`

## Developer Quick Start

### Prerequisites

- **Node.js ≥ 20**
- **mkcert** — for local HTTPS (required by Office.js)

### Setup

\`\`\`bash
git clone https://github.com/tmustier/pi-for-excel.git
cd pi-for-excel
npm install

# Generate local HTTPS certs (Office.js requires HTTPS)
mkcert -install   # one-time CA setup
mkcert localhost   # creates localhost.pem + localhost-key.pem
mv localhost-key.pem key.pem
mv localhost.pem cert.pem
\`\`\`

### Run

\`\`\`bash
npm run dev        # Vite dev server on https://localhost:3000
\`\`\`

Then sideload the dev manifest into Excel:

**macOS** ([Microsoft docs](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-an-office-add-in-on-mac)):
\`\`\`bash
cp manifest.xml ~/Library/Containers/com.microsoft.Excel/Data/Documents/wef/
\`\`\`
Then open Excel → **Insert** → **My Add-ins** → **联影AI_Base_PI**.

**Windows** ([Microsoft docs](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-office-add-ins-for-testing)):

Open Excel → **Insert** → **My Add-ins** → **Upload My Add-in** → select \`manifest.xml\`.

The dev manifest points to \`https://localhost:3000\`. The production manifest (\`manifest.prod.xml\`) points to the hosted Vercel deployment.

### Useful commands

| Command | Description |
|---|---|
| \`npm run dev\` | Start Vite dev server (port 3000, HTTPS) |
| \`npm run build\` | Production build → \`dist/\` |
| \`npm run check\` | Lint + typecheck + CSS theme checks |
| \`npm run typecheck\` | TypeScript type checking only |
| \`npm run lint\` | ESLint |
| \`npm run test:models\` | Unit tests — model ordering |
| \`npm run test:context\` | Unit tests — tools, context, sessions, extensions, integrations |
| \`npm run test:security\` | Security policy tests — proxy, CORS, sandbox, OAuth |
| \`npm run proxy:https\` | CORS proxy for OAuth flows (default \`https://localhost:3000/__proxy__\`) |
| \`npm run validate\` | Validate the Office add-in manifest |

### CORS proxy

Some OAuth token endpoints are blocked by CORS inside Office webviews. If OAuth login fails:

1. User setup command: \`内置代理已集成\` (or \`curl -fsSL https://piforexcel.com/proxy | sh\` if Node is missing)
2. Dev/source setup command: \`npm run proxy:https\` (defaults to \`https://localhost:3000/__proxy__\`)
3. 在联影AI → \`/settings\` → **Proxy** → enable and set the URL
4. Retry login

API-key auth generally works without the proxy.

### Local bridges (Python / tmux)

Use one-command local bridge helpers:

- Python / LibreOffice bridge: \`npx pi-for-excel-python-bridge\` (default URL \`https://localhost:3340\`, real mode)
- tmux bridge: \`npx pi-for-excel-tmux-bridge\` (default URL \`https://localhost:3341\`, real mode)

在联影AI, these localhost bridge URLs are used by default. Configure \`/experimental ...-bridge-url\` only when you want a non-default URL.

Real-mode prerequisites:

- \`python3\` must be installed for \`python_run\` / \`python_transform_range\`
- LibreOffice (\`soffice\` or \`libreoffice\`) is required for \`libreoffice_convert\`
- \`tmux\` is required for the tmux bridge real mode

Optional assisted install (macOS/Homebrew):

- \`npx pi-for-excel-python-bridge --install-missing\`
- \`npx pi-for-excel-tmux-bridge --install-missing\`

Manual macOS install:

\`\`\`bash
brew install tmux
brew install --cask libreoffice
\`\`\`

To force safe simulated mode instead:

- \`PYTHON_BRIDGE_MODE=stub npx pi-for-excel-python-bridge\`
- \`TMUX_BRIDGE_MODE=stub npx pi-for-excel-tmux-bridge\`

Source-checkout alternatives remain available via \`npm run python:bridge:https\` and \`npm run tmux:bridge:https\`.

## Architecture

联影AI_Base_PI is a single-page Office taskpane add-in built with:

- **[Vite](https://vite.dev/)** — dev server + production bundler
- **[Lit](https://lit.dev/)** — web components for the sidebar UI
- **[pi-agent-core](https://www.npmjs.com/package/@earendil-works/pi-agent-core)** — agent runtime (tool loop, streaming, state management)
- **[pi-ai](https://www.npmjs.com/package/@earendil-works/pi-ai)** — multi-provider LLM abstraction (Anthropic, OpenAI, Google, GitHub Copilot)
- **[pi-web-ui](https://www.npmjs.com/package/@earendil-works/pi-web-ui)** — shared web UI components (message rendering, storage, settings dialogs)
- **[Office.js](https://learn.microsoft.com/en-us/office/dev/add-ins/)** — Excel workbook API

### Source layout

\`\`\`
src/
├── taskpane/          # App init, session management, tab layout, context injection
├── taskpane.html      # Entry HTML (loads Office.js + taskpane.ts)
├── taskpane.ts        # Entry script
├── boot.ts            # Pre-mount setup (CSS, patches)
├── tools/             # 16 core tools + feature-flagged tools + registry
├── prompt/            # System prompt builder
├── context/           # Workbook blueprint cache, selection/change tracking
├── auth/              # OAuth providers, API proxy, credential restore
├── models/            # Model ordering + version scoring
├── ui/                # Sidebar component, tool renderers, theme CSS
│   └── theme/         # Design tokens, component styles (DM Sans + teal-green palette)
├── commands/          # Slash command registry + builtins
├── extensions/        # Extension store, sandbox runtime, permissions
├── integrations/      # Web Search + MCP Gateway integration catalog
├── skills/            # Agent Skills catalog + runtime loader
├── experiments/       # Feature flag definitions + toggle logic
├── workbook/          # Workbook identity (hashed), session association, coordinator
├── conventions/       # Formatting defaults (currency, negatives, dp)
├── rules/             # Persistent user/workbook rules store
├── compaction/        # Auto-compaction thresholds + logic
├── storage/           # IndexedDB initialization
├── files/             # Files workspace (read/list always on; write/delete feature-gated)
├── audit/             # Workbook change audit log
├── messages/          # Message conversion helpers
├── debug/             # Debug mode utilities
├── stubs/             # Browser stubs for CSP/Node-only deps (Ajv, Bedrock, stream, etc.)
├── compat/            # Compatibility patches (Lit, marked, model selector)
└── utils/             # Shared helpers (HTML escape, type guards, errors)

scripts/               # Dev helpers — CORS proxy, tmux/python bridges, manifest gen
pkg/proxy/             # Publishable npm CLI package: \`pi-for-excel-proxy\`
pkg/python-bridge/     # Publishable npm CLI package: \`pi-for-excel-python-bridge\`
pkg/tmux-bridge/       # Publishable npm CLI package: \`pi-for-excel-tmux-bridge\`
tests/                 # Unit + security tests (~50 test files)
docs/                  # Current docs (install/deploy/features/policy) + archive/ for historical plans
skills/                # Bundled Agent Skill definitions (web-search, mcp-gateway, tmux-bridge, python-bridge)
public/assets/         # Add-in icons (16/32/80/128px)
\`\`\`

### Key design patterns

- **Tool registry as single source of truth** — \`src/tools/registry.ts\` defines all core tool names and construction. UI renderers, input humanizers, and prompt docs all derive from it.
- **Workbook coordinator** — serializes mutating tool calls per-workbook to prevent concurrent writes from multiple session tabs.
- **Auto-context** — the workbook blueprint, selection state, and recent changes are injected before each user message so the AI always knows what it's looking at.
- **Execution policy** — each tool is classified as \`read/none\` or \`mutate/content|structure\` to determine locking and checkpoint behavior.
- **Recovery checkpoints** — mutations automatically snapshot affected cells before writing, enabling one-click rollback.
- **Extension sandbox** — untrusted extensions (inline code, remote URLs) run in an iframe sandbox by default; built-in/local modules run on the host.

## Deployment

The production build is a static site deployed to [Vercel](https://vercel.com). See [docs/deploy-vercel.md](docs/deploy-vercel.md) for maintainer setup.

Users install by downloading \`manifest.prod.xml\` and uploading it in Excel — the manifest points to the hosted Vercel URL. Updates are automatic (close and reopen the taskpane).

## Documentation

| Doc | Description |
|---|---|
| [docs/install.md](docs/install.md) | Non-technical install guide |
| [docs/deploy-vercel.md](docs/deploy-vercel.md) | Hosted deployment (Vercel) |
| [docs/extensions.md](docs/extensions.md) | Extension authoring guide |
| [docs/integrations-external-tools.md](docs/integrations-external-tools.md) | Web Search + MCP integration setup |
| [docs/security-threat-model.md](docs/security-threat-model.md) | Security threat model |
| [docs/compaction.md](docs/compaction.md) | Session compaction (\`/compact\`) |
| [src/tools/DECISIONS.md](src/tools/DECISIONS.md) | Tool behavior decisions log |
| [src/ui/README.md](src/ui/README.md) | UI architecture + Tailwind v4 notes |

## Credits

- [联影AI](https://github.com/badlogic/pi-mono) by [@badlogic](https://github.com/badlogic) (Mario Zechner) — the agent framework powering this project. 联影AI_Base_PI uses pi-agent-core, pi-ai, and pi-web-ui for the agent loop, LLM abstraction, and session storage.
- [whimsical.ts](https://github.com/mitsuhiko/agent-stuff/blob/main/pi-extensions/whimsical.ts) by [@mitsuhiko](https://github.com/mitsuhiko) (Armin Ronacher) — the rotating "Working…" messages are adapted from his 联影AI 扩展, rewritten for a spreadsheet/finance audience.

## License

[MIT](LICENSE) © Thomas Mustier
`,me=`# Docs

This folder contains **current** docs that should match shipped behavior.

## Guides
- [Install 联影AI_Base_PI](./install.md)
- [Deploy hosted build on Vercel](./deploy-vercel.md)
- [Release notes (\`v0.9.5-pre\`)](./release-notes/v0.9.5-pre.md)
- [Release smoke test checklist](./release-smoke-test-checklist.md)
- [Release smoke run logs](./release-smoke-runs/README.md)

## Runtime features
- [Extensions (MVP authoring guide)](./extensions.md)
- [Integrations + External Tools](./integrations-external-tools.md)
- [Agent Skills interop (skills vs integrations)](./agent-skills-interop.md)
- [Compaction (\`/compact\`)](./compaction.md)
- [Manual full-workbook backups (\`/backup\`)](./manual-full-backups.md)

## Architecture & policy
- [Upstream divergences from pi-mono](./upstream-divergences.md)
- [Context management policy (cache-safe)](./context-management-policy.md)
- [Cache observability baselines](./cache-observability-baselines.md)
- [Security threat model](./security-threat-model.md)
- [Model / dependency update playbook](./model-updates.md)
- [UI architecture](../src/ui/README.md)
- [Tool behavior decisions](../src/tools/DECISIONS.md)

## Local bridge contracts
- [Tmux bridge contract (v1)](./tmux-bridge-contract.md)
- [Python / LibreOffice bridge contract (v1)](./python-bridge-contract.md)

## Archive
Historical planning/design docs were moved to [./archive](./archive/README.md) to keep top-level docs focused and current.
`,he="# Agent Skills interop: skills vs integrations\n\nThis repo uses two distinct concepts:\n\n## 1) Agent Skills (standard)\n\n- Standard: https://agentskills.io/specification\n- Format: `SKILL.md` + frontmatter\n- Portable across providers/harnesses\n\nIn this repo, standards artifacts live in:\n\n- `skills/web-search/SKILL.md`\n- `skills/mcp-gateway/SKILL.md`\n- `skills/tmux-bridge/SKILL.md`\n- `skills/python-bridge/SKILL.md`\n- `skills/extending-pi/SKILL.md`\n\n## 2) Integrations (Excel runtime)\n\nIntegrations are built-in, opt-in capability bundles in the Excel add-in runtime.\nThey control:\n\n- tool injection (`web_search`, `fetch_page`, `mcp`)\n- prompt guidance (`## Active Integrations`)\n- scope (session/workbook)\n- global external-tools safety gate\n\nCode lives under `src/integrations/*`.\n\n## Runtime skill loading\n\nThe add-in now exposes a `skills` tool for standards-based skill loading and management:\n\n- `skills` action=`list` → lists bundled+discoverable Agent Skills\n- `skills` action=`read` + `name` → returns full `SKILL.md`\n- `skills` action=`read` + `name` + `refresh=true` → bypasses cache and refreshes from current workspace-backed sources\n- `skills` action=`install` + `name` + `markdown` → installs/updates managed external skill at `skills/external/<name>/SKILL.md`\n- `skills` action=`uninstall` + `name` → removes managed external skill by name\n\nRuntime note: `skills` reads are cached per session runtime so repeated reads for the same skill avoid repeated source lookup. The cache is cleared when the runtime session identity changes (new/resume/switch context).\n\n`skills list` includes provenance for each entry (`source: bundled|external`, plus location).\n\nThe system prompt also includes `<available_skills>` entries so the model can choose a matching skill, then load it on demand.\n\n## Workspace-backed discovery\n\nThe runtime discovers non-bundled skills from the Files workspace automatically:\n\n- Managed installs: `skills/external/<name>/SKILL.md`\n- Workspace auto-discovery: `skills/<name>/SKILL.md` (excluding `skills/external/*`)\n\nName-collision precedence is:\n1. bundled\n2. managed external (`skills/external/...`)\n3. workspace auto-discovered (`skills/<name>/SKILL.md`)\n\nSafety: workspace-provided skills are untrusted input and may contain risky instructions/scripts.\n\n## Mapping table\n\n| Agent Skill | Integration ID | Tool name |\n|---|---|---|\n| `web-search` | `web_search` | `web_search`, `fetch_page` |\n| `mcp-gateway` | `mcp_tools` | `mcp` |\n\n## Why this split exists\n\n- **Skills** maximize portability/interoperability.\n- **Integrations** manage runtime consent, scoping, and local configuration in the Excel add-in.\n\nUse the term **skill** only for standards-based `SKILL.md` artifacts.\nUse **integration** for Excel runtime toggles and UI (`/tools`, or `/extensions` → Connections).\n",ge=`# Cache observability baselines

Baseline expectations for prefix-churn telemetry in 联影AI_Base_PI.

This is the operational companion to \`docs/context-management-policy.md\` (area #424, item 6).

## Signals used

From \`src/auth/stream-proxy.ts\` payload stats/snapshots:

- \`prefixChanges\`
- \`prefixModelChanges\`
- \`prefixSystemPromptChanges\`
- \`prefixToolChanges\`
- per-call \`prefixChangeReasons\`

These are request-prefix deltas within the same session key, based on:

- model identity
- system prompt
- serialized tool schemas

## Baseline scenario matrix

Use this as the default expectation map when reviewing context-shape changes.

| Scenario | Expected \`prefixChangeReasons\` on next call | Why |
|---|---|---|
| Fresh session first call | \`[]\` | No previous fingerprint exists yet. |
| Repeated turns with no settings/runtime changes | \`[]\` | Prefix should stay stable. |
| \`/model\` in **non-empty** session (default behavior) | \`["model"]\` | #442 restored in-place switching as default (pi-mono parity). |
| \`/model\` in **non-empty** session (fork opt-in enabled) | Source tab: \`[]\`; first call in new tab: \`[]\` | Model change creates a new runtime/session key instead of mutating the current tab prefix. |
| \`/model\` in **empty** session | \`["model"]\` | Empty sessions switch in-place. |
| Rules/workbook rules changed | \`["systemPrompt"]\` | Rules are rendered into system prompt. |
| Execution mode toggle (Auto/Confirm) | \`["systemPrompt"]\` | Mode guidance lives in system prompt. |
| Skills enable/disable/discovery change | \`["systemPrompt"]\` | Available-skills section is in system prompt. |
| Connection status change (same toolset) | \`["systemPrompt"]\` | Connection prompt section updates; tool schema usually unchanged. |
| Integration toggle (\`web_search\`, \`mcp_tools\`) | \`["systemPrompt", "tools"]\` | Both prompt integration section and tool list change. |
| Extension add/remove tool (schema delta) | includes \`"tools"\` | Tool schema changed. |
| Extension handler hot-reload with same schema | \`[]\` | #444 uses extension tool revision tracking so handler swaps still refresh runtime tools while schema-stable prefixes remain unchanged. |
| Extension \`llm.complete\` side call | Main runtime session: \`[]\` | Side completions use an extension-scoped session key, so prefix churn is isolated from the primary runtime session. |

## Investigation rules

If observed reasons differ from the matrix:

1. Confirm the trigger actually happened (or didn’t).
2. Check whether multiple triggers were combined in one step (e.g. integration + rules change).
3. Treat unexplained churn as a regression candidate and document root cause before merge.

## Suggested PR note snippet

When a PR intentionally changes context shape, include:

- trigger exercised
- expected reasons (from matrix)
- observed reasons
- whether delta is intentional

Example:

\`\`\`md
### Cache observability check
- Scenario: Integration toggle (\`web_search\` on)
- Expected: \`["systemPrompt", "tools"]\`
- Observed: \`["systemPrompt", "tools"]\`
- Result: matches baseline
\`\`\`
`,_e=`# Compaction (\`/compact\`)

联影AI_Base_PI runs each chat inside the selected model’s **context window** (e.g. Claude Opus 4.6: 200k tokens). When the conversation grows too large, requests will fail with errors like **“prompt is too long”**.

\`/compact\` is the manual escape hatch: it **replaces older history with a structured summary**, while keeping the most recent work verbatim.

## Automatic triggers

Auto-compaction (enabled by default, \`compaction.enabled\`) uses the shared hard budgets from \`getCompactionThresholds\` and fires at three points:

1. **Before a queued prompt** — projected context (current estimate + the new prompt) exceeds the hard trigger.
2. **Mid-turn, between tool-loop continuations** — after each completed tool batch, so a single tool-heavy turn can’t overflow a small context window before the next between-prompt check. The in-flight run continues from the compacted history.
3. **Context-overflow recovery** — when a run still ends in a provider context-overflow error (e.g. a LiteLLM \`ContextWindowExceededError\`), 联影AI 丢弃失败的助手消息, compacts, and retries the turn **once**. A second overflow stays in the transcript with an actionable error banner pointing at \`/compact\`.

When auto-compaction is disabled, overflow errors surface a banner suggesting \`/compact\`, scoping the request, or a larger-context model — instead of the raw provider error.

> Note: Compaction permanently drops older messages from the session (except what’s captured in the summary). If you need a full transcript, run \`/export\` **before** compaction.

## When to use \`/compact\`

- Context usage is trending high (see the status bar).
- You hit a hard failure like \`prompt is too long\` / context window exceeded.
- The model starts “forgetting” early decisions.

## What \`/compact\` does

At a high level, compaction produces a new message list:

1. A single **compaction summary** message (structured markdown)
2. A **recent tail** of messages kept as-is

Everything older than the kept tail is removed.

### 1) Find the compaction boundary

If the session already contains a \`compactionSummary\` message, we treat it as the boundary:

- we summarize only messages **after** the last summary
- and we **update** the existing summary instead of stacking multiple summaries

### 2) Choose what to keep vs summarize

We estimate token sizes using a conservative heuristic (**~chars/4**) and select a cut point so we keep roughly the last **~20,000 tokens** of conversation as a “recent tail”.

We also avoid starting the kept tail with a \`toolResult\` message (to keep tool call/result structure sane across providers).

### 3) Generate the structured summary

We serialize the to-be-summarized messages into a plain transcript:

- \`[User]: ...\`
- \`[Assistant]: ...\`
- \`[Assistant thinking]: ...\` (when present)
- \`[Tool result <name>]: ...\`

Then we ask the current model to produce a structured checkpoint (or update the previous summary).

\`/compact\` supports optional arguments:

- \`/compact focus on formulas and sheet names\`

Those arguments are appended to the prompt as an “Additional focus”.

Compaction also runs a lightweight **memory nudge** on the messages being summarized:

- if older user messages include explicit memory cues (for example, "remember this" / "don't forget"), 联影AI 显示提醒提示 before summarization
- the summarizer gets extra focus instructions to call out durable memory in **Critical Context** and distinguish:
  - behavioral preferences/rules → \`instructions\`
  - factual memory → \`notes/\` or workbook-scoped notes

### 4) Replace the session messages

After summarization succeeds, we replace the in-memory session with:

- \`compactionSummary\` (new/updated)
- \`...keptTail\`

In the UI, the summary is rendered as a collapsible “compact” card.

## What the model sees after compaction

\`compactionSummary\` is a custom UI message type, but it *is* included in LLM context.

Internally it’s converted into a \`user\` message like:

\`\`\`text
The conversation history before this point was compacted into the following summary:

<summary>
...
</summary>
\`\`\`

So the next turn’s prompt contains:

- the summary (as a single user message)
- plus the kept recent tail

## Token budgeting (implementation details)

We mirror 联影AI 的压缩默认值:

- \`reserveTokens\`: **16,384** (clamped for smaller context windows)
- \`keepRecentTokens\`: **20,000** (also clamped)
- summary generation \`maxTokens\`: \`floor(0.8 * reserveTokens)\` (then clamped to \`model.maxTokens\`)

We also truncate very large message blocks before summarization. If the summarization request still fails with a “prompt too long” error, we retry once with:

- more aggressive truncation, and
- a larger kept tail (so fewer messages are summarized)

## What happens when context is >100%

If the status bar shows **>100%** context usage, normal chat turns are likely to fail.

Running \`/compact\` will usually still work because it generates a *separate* summarization request built from a bounded subset of messages. If compaction succeeds:

- older history is replaced by the summary
- the context usage % should drop immediately

If compaction fails even after the retry, the fallback is to start a new chat (\`/new\`) and/or export the transcript first (\`/export\`).

## Small context windows (custom gateways)

Models behind custom gateways often have much smaller windows (32k–65k) than the 128k–200k mainstream models 联影AI 的默认值 are tuned for. Recommendations:

- **Set “最大上下文令牌数” accurately** in the gateway settings (\`/settings\` → custom gateway). This single value drives all context budgets: compaction thresholds, tool-output caps, and how many recent tool results are kept verbatim. Overstating it causes hard 400s; understating it wastes capacity.
- **Budgets scale automatically** below a 128k window: tool-output truncation caps shrink linearly (e.g. ~25KB instead of 50KB at 65k, floor 8KB / 200 lines), and history shaping keeps fewer verbatim tool results (3 at 65k, floor 2).
- **Scope your prompts.** Select the relevant range or name the sheet you care about instead of asking for whole-workbook analysis; large multi-sheet reads consume a small window very quickly.
- **Start new chats per task** (\`/new\`) rather than carrying long histories across unrelated tasks.

## Status bar interaction

The status bar context % is computed from:

- the **last successful assistant usage** (includes cached tokens like \`cacheRead/cacheWrite\`), plus
- an estimate for any messages after that usage

After \`/compact\`, last usage becomes stale (because the message list is rewritten). The UI detects this and temporarily estimates context usage from scratch until a new assistant response provides fresh usage.

## Where this is implemented

- \`/compact\` implementation: \`src/commands/builtins/export.ts\`
- Summary message type: \`src/messages/compaction.ts\`
- Injecting summary into LLM context: \`src/messages/convert-to-llm.ts\`
- UI rendering of the summary card: \`src/ui/message-renderers.ts\`
- Context % display + stale-usage fallback: \`src/taskpane/status-bar.ts\`
`,ve=`# Context Management Policy (cache-safe)

**Status:** Active policy (2026-02-11)  
**Scope:** How 联影AI_Base_PI builds model context across normal turns, tool loops, and long sessions **without regressing prompt caching**.

---

## Why this exists

We optimize for **answer quality and context headroom first**, then token/cost.

In practice, quality drops when we repeatedly inject low-signal context (large tool schemas, stale tool outputs, oversized workbook snapshots), even if caching reduces billed tokens.

This policy sets clear guardrails so we can improve context quality while preserving cache performance.

### Critical clarification (cache vs context window)

- Prompt caching helps **cost/latency** (prefill reuse), but does **not** increase available context window.
- Cached tokens still count toward context occupancy for that request.
- Optimization decisions must therefore target **context headroom first**, not billed input tokens alone.

---

## Current baseline (implemented)

- Each model call is built from: \`systemPrompt + messages + tools\`.
- Tool disclosure is deterministic on every call (including tool-result continuations) in \`src/auth/stream-proxy.ts\` (\`selectToolBundle()\`): when tools are present, runtime currently sends the full tool set.
- Runtime capability refresh in \`src/taskpane/init.ts\` now assigns \`agent.state.tools = ...\` only when tool metadata fingerprint changes **or** extension tool revision changes (extension register/unregister/reload), avoiding no-op churn on unrelated refresh passes while preserving schema-stable hot-reload correctness.
- Session IDs are stable per chat runtime (\`agent.sessionId\`), which is used by providers for cache continuity.
- Status/debug UI already shows payload composition counters (\`systemChars\`, \`toolSchemaChars\`, \`messageChars\`, call count) plus prefix-churn counters (\`prefixChanges\`, split by model/system/tools).
- Context window estimation uses provider usage anchored by \`calculateContextTokens()\` (\`input + output + cacheRead + cacheWrite\`) in \`src/utils/context-tokens.ts\`.
- Auto-compaction now uses shared hard budgets (\`getCompactionThresholds\`) for earlier quality protection while preserving existing status-bar warning semantics.

---

## Request-level mental model

For each LLM call, payload is rebuilt as:

\`systemPrompt + tools + messages\`

Implications:

- Tool schemas are a **per-request fixed overhead** (not an ever-growing chat-history block).
- If tool use must remain possible in a continuation call, tools must be present on that continuation request.
- Keeping \`systemPrompt\` + tool bundles stable improves prompt-cache reuse across turns.

---

## Cache-preserving invariants (must hold)

1. **Stable session identity**
   - Keep \`agent.sessionId\` stable for the lifetime of a session.

2. **Stable base prompt inside a session**
   - Treat the base system prompt as immutable during a session.
   - Avoid per-turn noise in the system prompt.

3. **Deterministic tool schemas**
   - Deterministic order for tools/schemas.
   - No random IDs/timestamps in tool descriptions/schemas.

4. **Dynamic context at the tail**
   - Put volatile data (selection, recent edits, latest tool outputs) near the end of message history.

5. **Discrete context resets only**
   - Compaction should be explicit/discrete, not continuous churn.

---

## Policy by context layer

| Layer | Policy | Reinjection trigger |
|---|---|---|
| Base system prompt | Keep minimal and stable per session | Every call (provider APIs are request-based) |
| Tool schemas | Include a deterministic tool set on every call so continuations can keep using tools (current runtime policy: full set) | Every call |
| Workbook structural context | Inject as separate context block (not baked repeatedly into base prompt) | Session start + workbook hash/version change |
| Per-turn auto-context (selection + recent changes) | Keep bounded and high-signal | Per user turn when non-empty |
| Tool results in model-facing history | Keep fresh full detail short-term, summarize/prune older bulky outputs | On pressure/threshold |
| Compaction | Trigger before hard limits to protect quality | Soft and hard thresholds |

---

## Implementation plan (next slices)

### Slice 1 — Payload snapshots (observability first)

**Goal:** make optimization decisions with real payload evidence.

- Add a small ring buffer of recent request snapshots (debug-only).
- Retention defaults:
  - keep the latest **24 request snapshots**
  - keep latest-context entries for up to **24 sessions**
  - rationale: enough history to inspect multi-step tool loops while keeping taskpane memory bounded
- Capture, per call:
  - call index
  - continuation vs first call
  - tools included yes/no
  - section sizes (system/tool/messages)
  - optional provider payload shape via \`onPayload\` (redacted)

**Success:** we can compare before/after context composition on real sessions without guesswork.

---

### Slice 2 — Cache-safe tool disclosure

**Goal:** maximize cache reuse and avoid intent-based cache key partitioning.

- Keep tool-bundle metadata centralized (\`src/tools/capabilities.ts\`) for shared UI/prompt metadata and future opt-in routing.
- Runtime disclosure currently prefers cache continuity over schema minimization: when tools are present, expose \`full\`.
- Continuations still include tools on every call so multi-step tool loops remain intact.
- **Current rollout (v2):**
  - \`none\` when no tools are present
  - \`full\` for both core-only and mixed (core + non-core/extension) toolsets

**Success:** stable prompt-cache patterns with no capability gaps across turns.

---

### Slice 3 — Tool-result history shaping

**Goal:** cut transcript noise from large tool outputs.

- Add model-facing truncation/summarization for older or oversized tool results.
- Keep full raw output in UI/tool cards (no loss of user-visible detail).
- Keep recency window for exact details (latest N tool results untouched).
- **Current rollout (v2):**
  - **execution-time guardrail (primary):** global tool-output truncation wrapper on all registered tools with 联影AI 对齐的限制 (**50KB UTF-8 bytes** or **2000 lines**, whichever first). For context windows **below 128k**, caps scale linearly with the window (floors: 8KB / 200 lines) — see \`src/context/window-budgets.ts\` (#566).
  - **history shaping (secondary):** keep latest **6** tool results untouched (scaled down for <128k windows, e.g. **3** at 65k, floor 2); compact older tool results when payload exceeds **1,200 chars** or contains images; include a deterministic **500-char preview** in compacted form.
  - truncated outputs include stable machine metadata (\`details.outputTruncation\`) and best-effort full-output persistence under Files workspace \`.tool-output/...\`.

**Success:** lower message-context growth rate with no UX regression.

---

### Slice 4 — Workbook context invalidation policy

**Goal:** refresh structural workbook context only when necessary.

- Compute workbook context hash/version from structural signals.
- Reinject structural context on hash/version change, workbook switch, or explicit refresh.
- Avoid re-sending large workbook snapshots every turn.
- **Current rollout (v1):** workbook blueprint removed from base system prompt; injected via auto-context only on initial call, workbook switch, blueprint invalidation, or when compaction removed prior workbook context.
- **Lean invalidation policy:** only **structure-impact** tool writes invalidate blueprint context (centralized in \`execution-policy\` + coordinator wrapper), while value/format/comment/view writes do not.

**Success:** fewer large context swings; better cache reuse.

---

### Slice 5 — Compaction tuning + hygiene UX

**Goal:** protect quality earlier in long threads.

- Tune soft/hard compaction thresholds for earlier quality protection.
- Keep compaction summary compact and action-oriented.
- Add easier “summarize + start fresh” flow for noisy sessions.
- **Current rollout (v2):**
  - hard trigger = \`min(contextWindow - reserveTokens, qualityCap)\`
  - \`qualityCap\` = **88%** of context window for ≥128k models, **85%** for ≥200k models
  - soft warning = max(70% of hard trigger, hard trigger − 5% of context window, min margin 2,048 tokens)
  - auto-compaction uses the hard trigger both **before queued prompts** and **mid-turn between tool-loop continuations** (\`Agent.prepareNextTurn\`); status-bar warnings remain on the existing 40%/60% UX thresholds
  - runs that still end in a provider **context-overflow error** get one compact-and-retry recovery pass (see \`src/compaction/overflow-recovery.ts\`, #566)
  - summarized slices are persisted in a UI-only \`archivedMessages\` bucket with a “Show earlier messages” card (excluded from model context)

**Success:** fewer degraded late-thread responses.

---

## Verification checklist (each slice)

- \`npm run check\`
- \`npm run build\`
- \`npm run test:models\`
- Manual Excel smoke test (read/write/format flow)
- Real-session payload comparison with debug snapshots:
  - tools included where expected by bundle policy (including continuations)
  - \`toolSchemaChars\` down (target: meaningful reduction)
  - context occupancy trends healthy (\`calculateContextTokens\`: input/output/cacheRead/cacheWrite)
  - cache usage remains healthy (\`cacheRead\`/\`cacheWrite\` trend not regressing)

---

## Non-goals

- We are **not** replacing provider caching behavior.
- We are **not** changing user-visible tool result text as part of metadata-only slices.
- We are **not** introducing transport-level append semantics in this phase.

---

## #424 investigation updates (current)

| Area | Decision | Status | Notes |
|---|---|---|---|
| 1) Compaction call-shape | **Defer** behavior change | ✅ documented | Keep isolated summarizer request for now. Memo: \`docs/archive/issue-424-compaction-call-shape.md\`. |
| 2) Mid-session model switching | **Implement** cache-safe behavior | ✅ shipped (#428, #442) | Default now matches pi-mono (in-place); optional fork-to-new-tab behavior is available as an advanced setting for non-empty sessions. See \`docs/upstream-divergences.md\` §1. |
| 3) Mid-session toolset churn | **Implement** targeted stabilization | ✅ shipped (#436), refined (#444) | Runtime skips no-op \`setTools(...)\` updates via fingerprinting and uses extension tool revision tracking for schema-stable hot-reload updates (without blanket eager refreshes). See \`docs/upstream-divergences.md\` §2. |
| 4) Mid-session system-prompt churn | **Keep + defer deeper refactor** | ✅ decision recorded | Keep dynamic safety-critical sections (rules, execution mode, connection/integration/skills state) in system prompt for now. Defer stable-base + volatile-message layering until telemetry justifies complexity. |
| 5) Side LLM operations (\`llm.complete\`) | **Keep intentionally independent** | ✅ guidance + session-key isolation implemented | Treat extension side-completions as separate from main runtime context; extension calls now use extension-scoped side session keys so observability/prefix churn is isolated from the primary runtime. See \`docs/upstream-divergences.md\` §3. |
| 6) Cache observability policy | **Implement v1 workflow policy** | ✅ policy + baseline matrix documented | Use prefix-churn counters + payload snapshots as release/PR smoke signals for context changes. Baselines: \`docs/cache-observability-baselines.md\`. |

### Cache observability policy (v1)

For context/tool/prompt changes, treat the following as a required investigation checklist (not hard-fail CI gates yet):

- Baseline expectations by scenario: \`docs/cache-observability-baselines.md\`
- Run-log template: \`docs/release-smoke-runs/templates/context-cache-telemetry-template.md\`

1. Enable debug mode and capture a short deterministic session (at least 5 calls including one tool loop).
2. Inspect \`prefixChanges\` and reason breakdown (\`model\`, \`systemPrompt\`, \`tools\`) from status/debug snapshots.
3. Compare observed \`prefixChangeReasons\` to the baseline scenario matrix.
4. Investigate unexpected churn when:
   - model changes occur without explicit user/model-selector action,
   - system-prompt changes occur without explicit rules/execution-mode/integration/connection/skills updates,
   - tool-schema changes occur without explicit integration/extension/tool-config updates.
5. Record findings in PR summary when a context-shape change is intentional.

## Open decisions

1. Exact tool bundle definitions + routing heuristics.
2. Tool-result shaping thresholds (size and recency).
3. Workbook hash signal set (what counts as structural change).
4. Whether to tighten or relax v1 soft/hard compaction budgets by provider/model family after more live-session telemetry.
`,ye='# Deploy hosted build on Vercel (maintainers)\n\n联影AI_Base_PI’s taskpane is a static site built by Vite (`dist/`).\n\nVercel is a good default host because it’s free for OSS/hobby usage and handles HTTPS + caching well.\n\n## One-time setup\n\n1. Create a new Vercel project\n2. Import `tmustier/pi-for-excel`\n3. Framework preset: **Vite** (or “Other”)\n4. Build settings:\n   - **Build Command:** `npm run build`\n   - **Output Directory:** `dist`\n\nThis repo includes `vercel.json` with:\n- `outputDirectory: dist`\n- an `ignoreCommand` deploy policy (`node scripts/vercel-ignore-command.mjs`) for `main`, PR previews, and manual deploys\n- `/proxy` rewrite to `/proxy.sh` (bootstrap script for `内置代理已集成`)\n- a header rule to disable caching for `/src/taskpane.html` to make updates propagate reliably\n- an enforced `Content-Security-Policy` on `/src/taskpane.html` (Office.js + provider/auth endpoints + localhost proxy + Pyodide CDN host).\n\n### `ignoreCommand` policy\n\nAutomatic deploy behavior is:\n- **build** for `main`\n- **build** for pull requests (`VERCEL_GIT_PULL_REQUEST_ID` is set)\n- **build** for manual deploys (`VERCEL_GIT_COMMIT_REF` is unset)\n- **skip** non-PR feature branch pushes\n\nRegression coverage lives in `tests/vercel-ignore-command.test.mjs` (run via `npm run test:security`).\n\nIf a host-specific regression appears, temporary rollback is a single-header change:\n`Content-Security-Policy` → `Content-Security-Policy-Report-Only`.\n\n## Production URL\n\nAfter deploy, you’ll have a production URL like:\n\n- `https://<project>.vercel.app`\n\nKeep this URL stable; it becomes the base URL used by `manifest.prod.xml`.\n\n## Generate / update the production manifest\n\nThe dev manifest (`manifest.xml`) points at `https://localhost:3000`.\n\nGenerate the production manifest with the hosted base URL:\n\n```bash\nADDIN_BASE_URL="https://<project>.vercel.app" npm run manifest:prod\n```\n\nThis writes:\n- `manifest.prod.xml` (repo root)\n- `public/manifest.prod.xml` (so the hosted site can offer a one-click download at `/manifest.prod.xml`)\n\n## Updates (automatic)\n\nFor most UI/behavior changes:\n- deploy a new build to the same Vercel project\n- users get the update automatically next time they open the taskpane\n\nIf a release requires a manifest change (rare):\n- update and redistribute `manifest.prod.xml`\n- users re-upload the manifest in Excel\n',be=`# Secure connection bundle template (API-backed extensions)

Use this when an extension tool needs API credentials and you want safe, non-chat setup.

## Goals

- No secrets in chat.
- No \`/set-key <secret>\` commands.
- Single user setup surface: \`/tools\` → Connections.
- Host-injected auth for \`api.http.fetch\` by default.
- Keep extension code small and easy to audit.

## Default architecture (recommended)

1. Register a connection with \`secretFields\` + \`httpAuth\`.
2. Mark tools with \`requiresConnection\`.
3. User saves credentials in \`/tools\` → Connections.
4. Tool calls \`api.http.fetch(url, { connection: "<id>" })\`.
5. Host injects auth headers and enforces \`allowedHosts\`.

No custom secret widget 是必填项。

---

## Copy/粘贴 template (single-file extension module)

\`\`\`js
const EXT = {
  connectionId: "acme",
  connectionTitle: "Acme API",
  capability: "query Acme records",
  toolName: "acme_lookup",
  endpointBaseUrl: "https://api.acme.com/v1",
};

function asNonEmptyString(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function activate(api) {
  api.connections.register({
    id: EXT.connectionId,
    title: EXT.connectionTitle,
    capability: EXT.capability,
    authKind: "api_key",
    secretFields: [{
      id: "apiKey",
      label: "API key",
      required: true,
      maskInUi: true,
    }],
    httpAuth: {
      placement: "header",
      headerName: "Authorization",
      valueTemplate: "Bearer {apiKey}",
      allowedHosts: ["api.acme.com"],
    },
    setupHint: "Open /tools → Connections → Extension connections",
  });

  api.registerTool(EXT.toolName, {
    description: \`Lookup data from \${EXT.connectionTitle}\`,
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
      },
      required: ["query"],
      additionalProperties: false,
    },
    requiresConnection: [EXT.connectionId],
    async execute(params) {
      const query = asNonEmptyString(params.query);
      if (!query) {
        return {
          content: [{ type: "text", text: "Missing required query." }],
        };
      }

      const response = await api.http.fetch(
        \`\${EXT.endpointBaseUrl}/search?q=\${encodeURIComponent(query)}\`,
        {
          method: "GET",
          connection: EXT.connectionId,
        },
      );

      return {
        content: [{ type: "text", text: response.body }],
        details: { status: response.status },
      };
    },
  });
}
\`\`\`

---

## Escape hatch (advanced only): \`connections.getSecrets\`

If you cannot use header injection (for example SDK bootstrap, custom signing/HMAC), you can read raw secrets:

\`\`\`js
const secrets = await api.connections.getSecrets("acme");
\`\`\`

Notes:
- gated by capability: \`connections.secrets.read\`
- prefer host-injected auth whenever possible
- never echo/log secret values

## Bridge recommendation for assistant-driven API development

The extension can run without local bridges, but implementation/debugging is easier when the assistant can run local commands.

- **Preferred:** Python bridge (\`python-bridge\` skill) for API probes, payload transforms, and deterministic scripts.
- **Fallback:** tmux bridge (\`tmux-bridge\` skill) for \`curl\`, Node scripts, and CLI checks.
- If neither bridge is available, proceed with scaffolding and call out reduced verification.

## What to customize

- \`connectionId\`, \`connectionTitle\`, \`capability\`
- \`toolName\`, \`endpointBaseUrl\`
- \`httpAuth.headerName\` / \`valueTemplate\`
- \`httpAuth.allowedHosts\`
- request URL/payload mapping in \`execute\`

## Assistant checklist

- Do not ask users for secrets in chat.
- Keep secret entry in \`/tools\` → Connections.
- Use \`requiresConnection\` for API tools.
- Prefer \`api.http.fetch(..., { connection })\` over manual header construction.
- Use \`connections.getSecrets\` only when host-injected auth cannot support the integration.
`,xe=`# Extensions (MVP authoring guide)

联影AI_Base_PI supports runtime extensions that can register commands/tools, render UI in the sidebar, and use mediated host capabilities (LLM, HTTP, storage, clipboard, agent steering/context, skills, downloads).

> Status: shipped with feature flags for advanced controls. Inline-code and remote-URL extensions run in sandbox runtime by default; built-in/local-module extensions stay on host runtime. Roll back untrusted sources to host runtime only via \`/experimental on extension-sandbox-rollback\`. Additive Widget API v2 is feature-flagged via \`/experimental on extension-widget-v2\`.

## Quick start

1. Open the manager with:
   - \`/extensions\`
2. Install one of:
   - **Pasted code** (recommended for quick prototypes)
   - **URL module** (requires explicit unsafe opt-in)
3. Enable/disable/reload/uninstall from the same manager.
4. Review and edit capability permissions per extension (changes auto-reload enabled extensions).

## Create extensions directly from chat

您可以要求联影AI 构建和安装扩展 without leaving the conversation.

Example prompt:

\`\`\`txt
Create an extension named "Quick KPI" that adds /kpi-summary.
The command should read the active sheet, find numeric columns, and show a small widget with totals.
Then install it.
\`\`\`

联影AI 可以使用 the \`extensions_manager\` tool to:
- list installed extensions
- install an extension from generated code
- enable/disable, reload, and uninstall extensions

## Install source types

| Source | How to use | Default policy |
|---|---|---|
| Local module specifier | Built-ins/programmatic installs (not currently exposed in \`/extensions\` UI) | ✅ allowed |
| Blob URL (粘贴d code) | \`/extensions\` → install code (stored in settings, loaded via blob URL + dynamic import) | ✅ allowed |
| Remote HTTP(S) URL | \`/extensions\` → install URL | ❌ blocked by default |

Enable remote URLs only if you trust the code source:

\`\`\`txt
/experimental on remote-extension-urls
\`\`\`

## Module contract

An extension module must export \`activate(api)\` (named export or default export).

\`\`\`ts
export function activate(api) {
  // register commands/tools/UI
}
\`\`\`

Optional cleanup hooks:

- \`activate(api)\` may return:
  - \`void\`
  - a cleanup function
  - an array of cleanup functions
- Module may also export \`deactivate()\`

On disable/reload/uninstall, 联影AI 运行清理函数 (reverse order), then \`deactivate()\`.

## API surface (\`ExcelExtensionAPI\`)

### \`registerCommand(name, { description, handler, busyAllowed? })\`
Registers a slash command.

- \`busyAllowed\` controls whether the command can run while 联影AI 正在流式传输/忙碌.
- Default: \`true\` for extension commands.
- Set \`busyAllowed: false\` when the command should wait until 联影AI 空闲.

### \`registerTool(name, toolDef)\` / \`unregisterTool(name)\`
Registers or removes an agent-callable tool.

Notes:
- \`parameters\` should be a JSON-schema/TypeBox-compatible object.
- In sandbox runtime, plain JSON schema objects are accepted and wrapped safely by the host bridge.
- Tool names must not conflict with core built-in tools.
- Tool names must be unique across enabled extensions.
- \`toolDef.requiresConnection\` can be a string or string[] of connection ids.
  - IDs are owner-qualified automatically (for extension \`ext.foo\`, \`"apollo"\` becomes \`"ext.foo.apollo"\`).
  - Required connections are preflight-checked before tool execution.

### \`connections\`
Connection registration + credential lifecycle APIs:
- \`connections.register(definition)\`
- \`connections.unregister(connectionId)\`
- \`connections.list()\` / \`connections.get(connectionId)\`
- \`connections.setSecrets(connectionId, secrets)\` / \`connections.clearSecrets(connectionId)\`
- \`connections.markValidated(connectionId)\` / \`connections.markInvalid(connectionId, reason)\`
- \`connections.markStatus(connectionId, status, reason?)\`
- \`connections.getSecrets(connectionId)\` (**escape hatch**; gated by \`connections.secrets.read\`)

Use this to declare extension-specific connection requirements (capability + secret fields), store credentials securely in host-managed local settings, and surface deterministic setup/auth states to the assistant.

Default recommendation:
- Prefer host-managed auth injection (\`http.fetch(..., { connection: "..." })\`) so extension code does not handle raw secrets.
- Use \`connections.getSecrets(...)\` only for advanced/non-standard auth flows (for example SDK bootstrap or custom request signing).

#### User setup via \`/tools → Connections\`

Registered extension connections appear automatically in the \`/tools\` overlay under **Extension connections** (between Web search and MCP servers). Each connection renders as a card with:

- Status badge: **Connected** / **Not configured** / **Invalid** / **Error**
- Secret field inputs (empty by default; \`✓ Saved\` indicator when a value exists)
- Save (merge-patch — only entered fields are updated) and Clear actions
- Error callout when the last tool call triggered an auth failure

The section is hidden when no extensions are installed and shows an empty state when extensions are installed but none have registered connections.

#### \`definition.httpAuth\` (host-injected auth)

Optional connection definition block for \`http.fetch(..., { connection })\`:

\`\`\`ts
httpAuth: {
  placement: "header",
  headerName: "Authorization",
  valueTemplate: "Bearer {apiKey}",
  allowedHosts: ["api.example.com"],
}
\`\`\`

Rules:
- \`placement\` currently supports \`"header"\` only.
- \`valueTemplate\` placeholders (\`{...}\`) must reference declared \`secretFields\` ids.
- \`allowedHosts\` is required and uses exact host matching for safe auth injection.

### \`agent\`
Agent API surface:
- \`agent.raw\` (host runtime only; capability-gated)
- \`agent.injectContext(content)\`
- \`agent.steer(content)\`
- \`agent.followUp(content)\`

### \`llm.complete(request)\`
Host-mediated LLM completion. Supports optional model override (\`provider/modelId\` or model id), optional \`systemPrompt\`, and \`messages\` (\`user\`/\`assistant\`).

Cache/prompt-shape guidance for extension authors:
- Treat \`llm.complete\` as an **independent side completion** by default (separate from the main chat loop/tool prefix).
- Host runtime uses an extension-scoped side session key for \`llm.complete\`, so side-call churn is isolated from the primary runtime session telemetry.
- Keep \`systemPrompt\` short and stable across repeated extension calls when possible.
- Put volatile data in \`messages\` rather than rewriting \`systemPrompt\` every call.
- Use \`agent.injectContext\` / \`agent.steer\` when you need to influence the primary runtime conversation instead of emulating it through \`llm.complete\`.

### \`http.fetch(url, options?)\`
Host-mediated outbound HTTP fetch with security policy enforcement.

Options include:
- \`method\`, \`headers\`, \`body\`, \`timeoutMs\`
- optional \`connection\` id for host-managed auth injection

When \`connection\` is provided:
- host qualifies and validates ownership (\`ext.<id>.<connection>\`)
- connection status must be \`connected\`
- request host must match \`definition.httpAuth.allowedHosts\`
- auth headers are injected from stored connection secrets
- 401/403 responses mark the connection as runtime auth-failed and surface structured connection errors

### \`storage.get/set/delete/keys\`
Persistent extension-scoped key/value storage.

### \`clipboard.writeText(text)\`
Writes plain text to clipboard via host bridge.

### \`skills.list/read/install/uninstall\`
Read bundled+external skills, and install/uninstall external skills.

### \`download.download(filename, content, mimeType?)\`
Triggers a browser download.

### \`onAgentEvent(handler)\`
Subscribe to runtime events (returns unsubscribe function).

### \`overlay.show(el)\` / \`overlay.dismiss()\`
Show or dismiss a full-screen overlay.

### \`widget.upsert(spec)\` / \`widget.remove(id)\` / \`widget.clear()\` (Widget API v2)
Primary widget lifecycle API (feature-flagged):
- \`upsert\` creates/updates by stable \`spec.id\`
- \`remove\` unmounts one widget by id
- \`clear\` unmounts all widgets owned by the extension

Enable with:

\`\`\`txt
/experimental on extension-widget-v2
\`\`\`

\`upsert(spec)\` supports optional metadata: \`title\`, \`placement\` (\`above-input\` | \`below-input\`), \`order\`, \`collapsible\`, \`collapsed\`, \`minHeightPx\`, \`maxHeightPx\`.

Widget API v2 host behavior:
- \`collapsible: true\` renders a built-in header toggle (expand/collapse) for predictable UX.
- Omitted optional fields preserve prior widget metadata on upsert (title/placement/order/collapse/size).
- \`minHeightPx\` / \`maxHeightPx\` are clamped to safe host bounds (\`72..640\` px).
- If both bounds are set and \`maxHeightPx < minHeightPx\`, host coerces \`maxHeightPx\` up to \`minHeightPx\`.
- Pass \`null\` for \`minHeightPx\` / \`maxHeightPx\` to clear a previously set bound while keeping other widget metadata unchanged.
- Use stable, extension-local ids (\`"main"\`, \`"summary"\`, \`"warnings"\`, etc.) and call \`api.widget.clear()\` for explicit in-session teardown when needed.

#### Widget API v2 best practices

- Keep widget ids stable and semantic; avoid random ids each render.
- Use content-only refreshes (\`upsert({ id, el })\`) when layout metadata is unchanged.
- Put long content in bounded cards (\`maxHeightPx\`) so chat/input layout stays predictable.
- Prefer host collapse controls (\`collapsible\`) over custom hide/show chrome where possible.
- Use \`placement: "below-input"\` sparingly (for low-priority/persistent helper widgets).

#### Widget API v2 multi-widget example

\`\`\`ts
export function activate(api) {
  const renderSummary = () => {
    const el = document.createElement("div");
    el.textContent = "Summary: 4 checks passed";
    api.widget.upsert({
      id: "summary",
      el,
      title: "Sheet summary",
      order: 0,
      collapsible: true,
      collapsed: false,
      minHeightPx: 96,
      maxHeightPx: 220,
    });
  };

  const renderWarnings = () => {
    const el = document.createElement("div");
    el.textContent = "Warnings: 2 outliers detected";
    api.widget.upsert({
      id: "warnings",
      el,
      title: "Warnings",
      placement: "below-input",
      order: 10,
      collapsible: true,
      collapsed: true,
    });
  };

  renderSummary();
  renderWarnings();

  return () => {
    api.widget.clear();
  };
}
\`\`\`

### \`toast(message)\`
Show a short toast notification.

## Example extension

\`\`\`ts
export function activate(api) {
  api.registerCommand("hello_ext", {
    description: "Say hello from extension",
    handler: () => {
      api.toast("Hello from extension 👋");
    },
  });

  const schema = {
    type: "object",
    properties: {
      text: { type: "string", description: "Text to echo" },
    },
    required: ["text"],
    additionalProperties: false,
  };

  api.registerTool("echo_text", {
    description: "Echo text back",
    parameters: schema,
    async execute(params) {
      const text = typeof params.text === "string" ? params.text : "";
      return {
        content: [{ type: "text", text: \`Echo: \${text}\` }],
        details: { length: text.length },
      };
    },
  });

  const onTurnEnd = api.onAgentEvent((ev) => {
    if (ev.type === "turn_end") {
      // optional event handling
    }
  });

  return () => {
    onTurnEnd();
    api.widget.clear();
    api.overlay.dismiss();
  };
}
\`\`\`

## Permission review/revoke

The \`/extensions\` manager shows capability toggles per installed extension.

- Install from URL/code asks for confirmation and shows the default granted permissions.
- Enabling an extension with higher-risk grants prompts for confirmation.
- Toggling a permission updates stored grants in \`extensions.registry.v2\`.
- If the extension is enabled, 联影AI 立即重新加载 so revokes/grants take effect right away.
- If \`/experimental on extension-permissions\` is off, configured grants are still saved but not enforced until you enable the flag.

High-risk capabilities include:
- \`tools.register\`
- \`agent.read\`
- \`agent.events.read\`
- \`llm.complete\`
- \`http.fetch\`
- \`agent.context.write\`
- \`agent.steer\`
- \`agent.followup\`
- \`skills.write\`
- \`connections.readwrite\`
- \`connections.secrets.read\`

## Sandbox runtime default + rollback kill switch

Default behavior:
- inline-code and remote-URL extensions run in an iframe sandbox runtime
- built-in/local-module extensions stay on host runtime
- \`/extensions\` shows runtime mode per extension

If maintainers need an emergency rollback path, enable host-runtime fallback for untrusted sources:

\`\`\`txt
/experimental on extension-sandbox-rollback
\`\`\`

Disable rollback and return to default sandbox routing:

\`\`\`txt
/experimental off extension-sandbox-rollback
\`\`\`

You can also toggle this in \`/extensions\` via the **Sandbox runtime (default for untrusted sources)** card.

Current sandbox bridge limitations (intentional for this slice):
- \`api.agent.raw\` is not available in sandbox runtime (use bridged \`injectContext/steer/followUp\`)
- widget/overlay rendering uses a **structured, sanitized UI tree** (no raw HTML / no \`innerHTML\`)
- interactive callbacks are limited to explicit action markers (\`data-pi-action\`), which dispatch click events back inside sandbox runtime
- Widget API v2 (\`widget.upsert/remove/clear\`) is available only when \`extension-widget-v2\` is enabled

## Local module authoring (repo contributors)

Local module specifiers are used for built-ins (for example the seeded Snake extension).

For built-in/repo extensions:

1. Add a file under \`src/extensions/*.ts\`
2. Export \`activate(api)\`
3. Register/load it through app/runtime wiring (the \`/extensions\` UI currently exposes URL + 粘贴d-code installs)

Production builds only bundle local extension modules matched by \`src/extensions/*.{ts,js}\`.
If a local specifier is not bundled, loading fails with a clear error.

## Troubleshooting

- **"Extension module \\"...\\" must export an activate(api) function"**
  - Missing/invalid export.
- **"Remote extension URL imports are disabled by default"**
  - Enable with \`/experimental on remote-extension-urls\`.
- **"Local extension module \\"...\\" was not bundled"**
  - Local module path is outside bundled extension files.
- **Command/tool already registered**
  - Name conflicts with built-in or another extension.
- **Cleanup failure during disable/reload**
  - Check extension cleanup functions and optional \`deactivate()\`.

## Security notes (important)

- Extensions can read/write workbook data through registered tools and host APIs.
- Remote URL loading is intentionally off by default.
- Untrusted extension sources (inline/remote) run in sandbox runtime by default.
- Built-in/local-module extensions remain on host runtime.
- Capability gates can be enabled with \`/experimental on extension-permissions\`.
- Rollback kill switch for untrusted host-runtime fallback: \`/experimental on extension-sandbox-rollback\`.
`,Se=`# Files Workspace

The Files overlay provides a unified view of all files available to the agent during a session. Files can come from multiple sources depending on the host environment.

## Storage backends

| Backend | Key | When used |
|---------|-----|-----------|
| **OPFS** (Origin Private File System) | \`opfs\` | Default in all browser-based hosts. Sandboxed, persistent per origin. |
| **Native directory** | \`native-directory\` | When the user connects a local folder via the File System Access API. |
| **In-memory** | \`memory\` | Non-browser / test environments. |

The workspace manager selects a backend automatically on startup:

1. If a persisted native directory handle exists and permission is still granted → \`native-directory\`
2. If OPFS is available → \`opfs\`
3. Otherwise → \`memory\`

When a native directory is connected, both the OPFS workspace and the native directory are listed together as dual sources. Files from the connected folder appear in a dedicated section.

## Connected folders

Connected-folder mode lets users link a local directory so the agent can read project files directly. It relies on the **File System Access API** (\`showDirectoryPicker\`), which is only available in Chromium-based browsers.

### Host compatibility matrix

| Host | Engine | \`showDirectoryPicker\` | Connect folder button |
|------|--------|----------------------|----------------------|
| Excel Online (Chrome / Edge) | Chromium | ✅ Supported | Visible |
| Excel Online (Firefox) | Gecko | ❌ Not supported | Hidden |
| Excel Online (Safari) | WebKit | ❌ Not supported | Hidden |
| Excel desktop (macOS) | WKWebView | ❌ Not supported | Hidden |
| Excel desktop (Windows) | WebView2 (Chromium) | ⚠️ Varies by version | Auto-detected |

### Behavior in unsupported hosts

When \`showDirectoryPicker\` is unavailable:

- \`backendStatus.nativeSupported\` is \`false\`
- The **Connect folder** button is **hidden** — users never see a broken or confusing control
- The workspace uses OPFS (or in-memory) as the sole storage backend
- All other Files overlay features (upload, download, preview, rename, delete) work normally

### Behavior in supported hosts

When \`showDirectoryPicker\` is available:

- The **Connect folder** button is visible and enabled
- Clicking it opens the OS directory picker
- Once connected, the button shows **Connected ✓** (disabled)
- Files from the connected directory appear in a separate section labelled with the folder name
- The directory handle is persisted so it can be restored on next session (permission permitting)

## Related

- [PR #356](https://github.com/tmustier/pi-for-excel/pull/356) — Phase 2 dual-source connected-folder sections
- [PR #361](https://github.com/tmustier/pi-for-excel/pull/361) — Hide connect-folder action when unsupported
- [PR #362](https://github.com/tmustier/pi-for-excel/pull/362) — Centralize connect-folder button state
- [Issue #360](https://github.com/tmustier/pi-for-excel/issues/360) — Decision: keep feature, hide when unsupported
`,Ce=`# Install 联影AI_Base_PI

No coding or dev tools required — just download one file and add it to Excel.

---

## 1) Download the manifest file

Download this file and save it somewhere you can find it (e.g. your Desktop):

👉 **[manifest.prod.xml](https://pi-for-excel.vercel.app/manifest.prod.xml)**

<details>
<summary>Alternate download links (if the above is unavailable)</summary>

- Latest release: https://github.com/tmustier/pi-for-excel/releases/latest
- Direct repo copy: https://github.com/tmustier/pi-for-excel/blob/main/manifest.prod.xml

</details>

---

## 2) Add it to Excel

### macOS

1. Open Finder and press **Cmd + Shift + G** (Go to Folder)
2. Paste this path and 按回车键:
   \`\`\`
   ~/Library/Containers/com.microsoft.Excel/Data/Documents/wef
   \`\`\`
3. Copy \`manifest.prod.xml\` into that folder
4. Quit Excel completely (Cmd + Q) and reopen it
5. Go to **Insert → My Add-ins** — you should see **联影AI_Base_PI** listed. Click it to register the add-in.
6. Now look for the **Add-ins** button on the far right of the **Home** ribbon tab (it looks like four orange squares). Click it, then click **联影AI_Base_PI** to open the sidebar.

   <img src="../public/assets/add-ins-button.png" width="200" alt="Add-ins button in the Home ribbon tab" />
   <img src="../public/assets/add-ins-dropdown.png" width="200" alt="联影AI_Base_PI in the Add-ins dropdown" />

> **Folder doesn't exist?** Create it first — open Terminal and run:
> \`\`\`bash
> mkdir -p ~/Library/Containers/com.microsoft.Excel/Data/Documents/wef
> \`\`\`
> Then repeat from step 3.

For more detail, see [Microsoft's guide for Mac](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-an-office-add-in-on-mac).

### Windows

You can try to install and run this on Windows — it might work!

1. Open Excel
2. Go to **Insert → My Add-ins**
3. Click **Upload My Add-in…**
4. Select the \`manifest.prod.xml\` file you downloaded
5. Click **打开联影AI** in the ribbon

> ⚠️ Use **Upload My Add-in…** for \`manifest.prod.xml\`.
> Do **not** import it via **Manage → XML Expansion Packs** — that is a legacy Excel path and can surface misleading certificate errors for Office add-in manifests.

For more detail, see [Microsoft's guide for Windows](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-office-add-ins-for-testing).

### Excel on the Web (Office Online)

> **Community-contributed — not officially tested.** These steps were provided by a contributor and may not match every Office 365 tenant. If something looks different, see [Microsoft's sideloading guide for Office on the web](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-office-add-ins-for-testing#manually-sideload-an-add-in-to-office-on-the-web).

1. Open **[Excel (Web)](https://www.office.com/launch/excel)** in your browser  
2. Select an existing workbook or create a new Excel file  
3. In the **Home** tab (Start ribbon), click **Add-ins** on the right side  
4. Click **More Add-ins**  
5. Go to **My Add-ins**  
6. Click **Manage My Add-ins**  
7. Click **Upload My Add-in**  
8. Upload the \`manifest.prod.xml\` file  

> ⚠️ On Excel Web, the add-in can disappear after several days. If that happens, repeat the upload steps above.

---

## 3) First-run check

1. Open the taskpane (click the **Add-ins** button in the Home ribbon tab, then click **联影AI_Base_PI**)
2. Connect a provider (see below)
3. Send a test prompt, e.g.:
   - \`What sheet am I currently on?\`
   - \`Summarize my current selection\`

If you get a response, install is complete.

---

## 4) Connect a provider

### Recommended (easiest): API key

For most users, API keys are the smoothest setup and usually do **not** need the proxy.

1. 在联影AI, run \`/login\` (or use the welcome screen)
2. Expand a provider row (OpenAI, Google Gemini, Anthropic, etc.)
3. Paste your API key
4. Click **Save**

### Custom OpenAI-compatible gateway (company or local)

Use this when your org exposes an OpenAI-compatible endpoint (or for local OpenAI-compatible servers).

1. 在联影AI, open \`/settings\`
2. Under **Custom OpenAI-compatible gateways**, set:
   - **Endpoint** (base URL)
   - **Model** (model ID)
   - **API key** (optional for some local servers)
3. Save the gateway, then choose its model from \`/model\`

Notes:
- If your gateway is publicly reachable over HTTPS, you can usually connect directly (no proxy).
- For localhost/private endpoints via the local proxy, you may need to configure proxy host policy env vars (for example \`ALLOWED_TARGET_HOSTS\`, \`ALLOW_LOOPBACK_TARGETS\`, or \`ALLOW_PRIVATE_TARGETS\`) when starting \`pi-for-excel-proxy\`.

### OAuth / account login (Anthropic, OpenAI ChatGPT, Google Code Assist/Antigravity, GitHub Copilot)

1. In \`/login\`, click **Login with …**
2. Complete login in the browser window that opens
3. Return to Excel and complete any prompt shown
   - For OpenAI + Google OAuth flows, your browser will land on a page that says **"can't be reached"** — that's normal! Copy the full URL from the browser address bar and 粘贴 it when prompted in 联影AI_Base_PI
   - Some Google workspace tiers may also ask for a Google Cloud project ID during setup

If login fails with a CORS/network error, follow the next section.

---

## OAuth logins and CORS proxy

Some OAuth/token endpoints are blocked by CORS inside Office webviews (especially on macOS WKWebView).

Typical symptoms:
- \`Login was blocked by browser CORS\`
- \`Load failed\`
- \`Failed to fetch\`

### What to do

1. Run a local HTTPS proxy on the same machine as Excel (defaults to \`https://localhost:3000/__proxy__\`):

> ⚠️ **You may be asked for your Mac password** during this step. The proxy creates a local security certificate so Excel can talk to it securely. This is a one-time setup. If you are not an admin on this machine, ask your IT team to run this step for you.

If you already have Node.js:

\`\`\`bash
内置代理已集成
\`\`\`

If you do not have Node.js (or are unsure):

\`\`\`bash
curl -fsSL https://piforexcel.com/proxy | sh
\`\`\`

2. 在联影AI, open \`/settings\` → **Proxy**:
   - enable **Proxy**
   - set URL to \`https://localhost:3000/__proxy__\`

3. Retry OAuth login

Quick proxy sanity check (advanced):
- In Terminal, run:

\`\`\`bash
curl -k -i -s \\
  'https://localhost:3000/api-proxy/google-cloudcode/v1internal:streamGenerateContent?alt=sse' \\
  -X POST -H 'content-type: application/json' -d '{}' | head
\`\`\`

- \`401\` means proxy routing is working (request reached Google, but without auth token).
- \`404\` usually means a proxy/path issue.
- Use single quotes around the URL in zsh so \`?alt=sse\` is not treated as a glob.

Notes:
- 代理已内置为 HTTPS，无需手动配置。
- API 密钥提供商通常无需代理即可使用。
- 内置合并代理已自动启用，无需额外配置端口。

\`\`\`bash
内置代理已集成，无需手动运行
\`\`\`

---

## Updates

If you installed with \`manifest.prod.xml\`, 联影AI_Base_PI loads from a hosted URL and most updates are automatic.

- Normal case: close/reopen Excel taskpane to pick up latest version.
- Rare case (manifest changes): download the new \`manifest.prod.xml\` and upload it again in Excel.

---

## Troubleshooting

### 联影AI 未出现 in My Add-ins
- Re-open Excel and try again
- Ensure you uploaded \`manifest.prod.xml\` (not the localhost dev manifest)

### Windows says the manifest certificate is invalid / mentions XML Expansion Packs
- Use **Insert → My Add-ins → Upload My Add-in…** instead of **Manage → XML Expansion Packs**
- \`manifest.prod.xml\` is an Office add-in manifest, not a legacy Excel XML Expansion Pack
- If you already tried the XML Expansion Packs path, close Excel and repeat the upload flow above

### Taskpane opens but is blank
- Your network may block \`https://pi-for-excel.vercel.app\`
- Try a different network / VPN setting

### I installed, but changes are not visible
- Close and reopen Excel to clear cached taskpane state

### Do I need to install a separate Office.js bridge?
- No — Office.js support comes from Excel itself when you 安装联影AI 时 \`manifest.prod.xml\`
- You do **not** need \`generator-office\`, Yeoman, or any extra Office.js package to use the hosted add-in
- The optional local helper services are only for OAuth proxying, native Python / LibreOffice, and tmux

### OAuth login still fails
- Confirm proxy is running and reachable at the exact URL in \`/settings\`
- Confirm proxy URL is \`https://localhost:<port>\` (not \`http://\`)
- Try API key auth as a fallback

---

## Developer setup (separate)

If you want to run from source (\`localhost\`, Vite, mkcert), use the root README: [Developer Quick Start](../README.md#developer-quick-start).
`,we=`# Integrations + External Tools

Issue: [#24](https://github.com/tmustier/pi-for-excel/issues/24)

> Terminology: these are **integrations** (Excel runtime toggles), not Agent Skills.
> See [Agent Skills interop](./agent-skills-interop.md) for the standards mapping.

## What shipped

- **Tools & MCP manager UI** (\`/tools\`, or \`/extensions\` → Connections)
  - enable/disable integration bundles per **session** and/or **workbook**
  - clear warnings for network/tool access
  - active integrations shown in the status bar
- **Global safety gate**: \`external.tools.enabled\`
  - default: **on**
  - when disabled, blocks all external integration tools
- **Web Search integration**
  - tools: \`web_search\`, \`fetch_page\`
  - providers: Jina (default, no key required), Serper.dev, Tavily, Brave Search
  - configurable provider + provider-specific API key in \`/tools\`
  - fallback: if a configured keyed provider fails with auth/rate-limit/server/network errors, search retries with Jina for that request and surfaces a warning
  - result output includes explicit \`Sent:\` attribution and provider/transport metadata
- **MCP integration**
  - tool: \`mcp\`
  - server registry (\`mcp.servers.v1\`) configurable in \`/tools\`
  - add/remove/test server URL + optional bearer token
  - bearer tokens are stored in the shared connection store (\`connections.store.v1\`, record \`builtin.mcp.servers\`) with legacy \`mcp.servers.v1\` token fallback/migration

## Runtime model

Integrations are resolved as:

1. session-scoped enabled integrations
2. workbook-scoped enabled integrations
3. union of (1) and (2), ordered by catalog
4. if \`external.tools.enabled\` is false → active external integrations become empty

Active integrations contribute both:

- **tools** (\`web_search\`, \`fetch_page\`, \`mcp\`)
- **system prompt guidance** (\`## Active Integrations\` section)

## Notes

- External requests may be sent directly or routed via the existing proxy settings (\`proxy.enabled\`, \`proxy.url\`).
- MCP transport uses HTTP JSON-RPC requests against the configured server URL.
- Tool execution policy classifies \`web_search\`, \`fetch_page\`, and \`mcp\` as read-only/non-workbook operations.
`,Te=`# Manual full-workbook backups

Manual full-workbook backups are an **explicit user action** fallback for high-risk edits.

They are intentionally separate from automatic per-mutation range checkpoints (\`workbook_history\`).

## UI entry point

- Open **Backups (Beta)** (\`/history\` or Backups input action/menu).
- Click **Full backup** to capture and download the current workbook as \`.xlsx\`.

## Commands

- \`/backup\` or \`/backup create\`
  - Captures the current workbook as a compressed file.
  - Stores it in Files workspace under \`manual-backups/full-workbook/v1/...\`.
  - Immediately downloads the backup file.
- \`/backup list [limit]\`
  - Shows a short summary of recent manual full-workbook backups for the current workbook.
- \`/backup restore [id]\`
  - Downloads the latest backup (or a specific backup by id) for manual restore.
- \`/backup clear\`
  - Deletes all manual full-workbook backups for the current workbook.

## Restore semantics

Office.js does not expose a reliable in-place API to replace the currently open workbook from a captured snapshot across hosts.

So restore is intentionally:
1. Download chosen backup file.
2. Open it in Excel.
3. Continue from that restored workbook (or copy sheets/ranges as needed).

## Storage, naming, retention

- Storage backend: Files workspace (native directory when connected, otherwise OPFS/in-memory fallback).
- Path convention: \`manual-backups/full-workbook/v1/<workbook-id>/<backup-id>.xlsx\`.
- Scope guardrail: list/restore/clear are filtered to the active workbook identity.
- Retention: manual backups persist until explicitly cleared (\`/backup clear\`) or manually deleted from Files workspace.

## Host constraints

Manual full-workbook backup requires Office \`document.getFileAsync("compressed", ...)\` support.

If the host does not support compressed file capture, \`/backup create\` fails with an actionable error and no backup is created.
`,Ee='# Model / dependency update playbook\n\n**Last verified:** 2026-06-09\n\nThis repo hardcodes a small set of "featured" and "preferred" model IDs (for sorting + default selection). Those IDs come from 联影AI 的模型注册表 (`@earendil-works/pi-ai`) and will drift as new models ship (e.g. `gpt-5.5`, `gpt-5.3-codex`, `claude-fable-5`, `claude-opus-4-8`, `gemini-3.1-pro-preview`).\n\nThis doc describes how to update:\n- the **联影AI 依赖 versions** we ship (`@earendil-works/pi-ai`, `@earendil-works/pi-web-ui`, `@earendil-works/pi-agent-core`)\n- the **model ordering/default-selection behavior** in the add-in (`src/models/model-ordering.ts`, `src/taskpane/default-model.ts`, `src/compat/model-selector-patch.ts`)\n\n## Source of truth\n\n- **Built-in model IDs:** `node_modules/@earendil-works/pi-ai/dist/models.generated.js`\n  - This file is auto-generated upstream and is what `getModel(provider, id)` resolves against.\n- Don’t rely on 联影AI 的 `docs/models.md` for built-in IDs — that doc is about **custom models** via `~/.pi/agent/models.json`.\n\n## When to run this\n\n- If you want to add newly-released models and they’re missing from our add-in.\n- **If it’s been > 1 week since the last verification date above**, refresh deps + re-check model IDs.\n\n## What is now automated\n\n- Dependabot checks npm dependencies **daily**.\n- A dedicated Dependabot group (`pi-stack`) keeps these packages in one PR:\n  - `@earendil-works/pi-ai`\n  - `@earendil-works/pi-web-ui`\n  - `@earendil-works/pi-agent-core`\n- `.github/workflows/dependabot-pi-automerge.yml` auto-approves + enables auto-merge for that Dependabot group (merge still waits for green checks).\n- `npm run check` includes `scripts/check-pi-deps-lockstep.mjs`, which enforces the dependency policy below (`pi-ai` === `pi-agent-core`, exact pins, single shared `pi-ai` copy in the lockfile).\n\n## Step-by-step\n\n### 1) Check current installed versions\n\n```bash\nnode -p "require(\'./node_modules/@earendil-works/pi-ai/package.json\').version"\nnode -p "require(\'./node_modules/@earendil-works/pi-web-ui/package.json\').version"\nnode -p "require(\'./node_modules/@earendil-works/pi-agent-core/package.json\').version"\n```\n\n### 2) Check latest published versions\n\n```bash\nnpm view @earendil-works/pi-ai version\nnpm view @earendil-works/pi-web-ui version\nnpm view @earendil-works/pi-agent-core version\n```\n\nAlso inspect the version lists before choosing a target:\n\n```bash\nnpm view @earendil-works/pi-ai versions --json\nnpm view @earendil-works/pi-web-ui versions --json\nnpm view @earendil-works/pi-agent-core versions --json\n```\n\n**Dependency policy (since 2026-06-09):** upstream stopped publishing `pi-web-ui` in lockstep after `0.75.3`, while `pi-ai` / `pi-agent-core` kept moving (and new models like `claude-fable-5` only exist in newer `pi-ai`). The rules are now:\n\n- `@earendil-works/pi-ai` and `@earendil-works/pi-agent-core` move **together** to the newest common version.\n- `@earendil-works/pi-web-ui` stays at the newest *published* version (currently `0.75.3`) and is allowed to lag.\n- All three must be **exact-pinned** in `package.json`.\n- The root `package.json` `overrides` entry for `@earendil-works/pi-ai` (`"$@earendil-works/pi-ai"`) forces `pi-web-ui`\'s nested `^0.75.x` range onto the root version so the lockfile resolves **exactly one** copy of `pi-ai`. Two copies = two model registries = the ModelSelector and the app disagree about available models.\n- `scripts/check-pi-deps-lockstep.mjs` (run via `npm run check:pi-lockstep`) enforces all of this.\n- When bumping past `pi-web-ui`\'s compiled-against version, re-verify the runtime APIs it imports from `pi-ai` still exist (`complete`, `streamSimple`, `getModel`, `getModels`, `getProviders`, `modelsAreEqual`, `StringEnum`) and check the pi changelog for breaking OAuth/streaming surface changes (e.g. 0.79.x made `onDeviceCode` / `onSelect` required in `OAuthLoginCallbacks`).\n\n### 3) Bump dependencies in `package.json`\n\n```bash\nnpm install @earendil-works/pi-ai@<version> @earendil-works/pi-agent-core@<version> --save-exact\n```\n\nOnly bump `@earendil-works/pi-web-ui` when upstream actually publishes a newer version:\n\n```bash\nnpm install @earendil-works/pi-web-ui@<version> --save-exact\n```\n\n### 4) Verify the new model IDs exist in the registry\n\nSearch the local registry:\n\n```bash\nrg -n "gpt-5\\\\.5"       node_modules/@earendil-works/pi-ai/dist/models.generated.js -S\nrg -n "gpt-5\\\\.3-codex" node_modules/@earendil-works/pi-ai/dist/models.generated.js -S\nrg -n "claude-fable-5"   node_modules/@earendil-works/pi-ai/dist/models.generated.js -S\nrg -n "claude-opus-4-8"  node_modules/@earendil-works/pi-ai/dist/models.generated.js -S\nrg -n "gemini-3\\\\.1-pro-preview" node_modules/@earendil-works/pi-ai/dist/models.generated.js -S\nnpm run test:models\n```\n\nIf an ID doesn’t appear there, **don’t** add it to the add-in yet—either:\n- bump `@earendil-works/pi-ai` further, or\n- use an older/fallback ID, or\n- define a custom model via `~/.pi/agent/models.json`.\n\n### 5) Update model ordering + default selection logic (avoid hardcoding exact IDs)\n\nFiles:\n- `src/models/model-ordering.ts` (provider/family priority + version/recency scoring)\n- `src/taskpane/default-model.ts` (default-model selection rules)\n- `src/compat/model-selector-patch.ts` (ModelSelector ordering/featured-model behavior)\n- `tests/model-ordering.test.ts` (sanity tests; run `npm run test:models` — requires Node 22.19+)\n\nWe intentionally avoid pinning exact versioned IDs now. Instead we:\n\n- In the model picker, show:\n  1) current model first\n  2) **featured models** (pattern-based “latest” picks)\n  3) then the rest sorted deterministically\n\n  Featured rules (current desired behavior):\n  - **Anthropic:** latest **Fable** first (post-4.x flagship family, e.g. `claude-fable-5`), then latest **Sonnet** *if* its version >= latest **Opus**, then latest **Opus**\n    - This is picker ordering only; default selection currently skips Fable because it is in the registry but unavailable for normal Anthropic use.\n    - Version compare uses `parseMajorMinor()` where `claude-opus-4-6` → `46`, `claude-opus-4-7` → `47`, `claude-fable-5` → `50`.\n    - Important: IDs like `claude-opus-4-20250514` are treated as **major only** (`40`) and the `YYYYMMDD` part is considered a separate date suffix by `modelRecencyScore()`.\n  - **OpenAI (`openai` + `openai-codex`):** latest general `gpt-5.x` *if* its version >= latest `gpt-5.x-codex`, then latest Codex\n    - `gpt-5.5` scores as `55`; `gpt-5.3-codex` scores as `53`.\n    - Major-only GPT-5 IDs are also handled (`gpt-5`, `gpt-5-pro`, `gpt-5-codex`).\n    - Plain `gpt-5.x` / `gpt-5` beats same-version suffixed variants (`gpt-5.5` before `gpt-5.5-pro`, `gpt-5` before `gpt-5-pro`).\n  - **Google (API key):** latest `gemini-*-pro*` (regex: `/^gemini-.*-pro/i`)\n  - **Google OAuth providers (`google-gemini-cli`, `google-antigravity`):** prefer stable Gemini before previews\n\n  The ordering logic is driven by:\n  - `providerPriority()` (Anthropic → OpenAI Codex → OpenAI → Google → …)\n  - `familyPriority()` / `openAiFamilyPriority()` (Opus/Sonnet/Haiku, GPT vs Codex, etc.)\n  - `parseMajorMinor()` + `modelRecencyScore()` (treats `4-6` / `4.6` as `46`, `5.5` as `55`, keeps embedded date suffixes such as `YYYYMMDD` separate, and ignores later date-like suffixes such as `gpt-4o-2024-11-20` or `gemini-2.5-pro-preview-06-05` when extracting the family version)\n  - `compareModels()` (provider + family + recency tie-breaks; deterministic sorting)\n\n  UI: the model picker is opened from the footer status bar (click the UIH model button).\n\n- Pick the default model via provider-aware rules:\n  - Anthropic is a small special-case: latest Opus by default while Fable is in the registry but unavailable; Sonnet and Fable remain fallbacks if Opus is absent.\n  - OpenAI (`openai` + `openai-codex`) prefers the newest general GPT-5 when it is at least as new as Codex, with Codex as fallback\n  - otherwise `DEFAULT_MODEL_RULES` + `pickLatestMatchingModel()` (uses `getModels(provider)` to find the newest available ID)\n\nWhen new models ship, this usually “just works” as long as naming stays consistent. You only need to update these rules if:\n- a provider changes their naming scheme, or\n- you want different provider/family preferences.\n\nReminder: **`openai-codex` is NOT `openai`** (different base URL). See `src/auth/provider-map.ts`.\n\n### 6) Run it in Excel (dev vs build)\n\n**Important:** our `manifest.xml` currently points at the **dev server**:\n\n- `https://localhost:3000/src/taskpane.html`\n\nThat means:\n- `npm run build` is a *sanity check* (TypeScript + bundling), but it does **not** change what Excel loads.\n- To test changes in Excel, you need a dev server running on **port 3000**.\n\nRecommended local loop:\n\n```bash\n# 1) Start dev server (must be :3000 because manifest hardcodes it)\nnpm run dev\n\n# 2) (Re)register / launch Excel with the add-in\nnpm run sideload\n```\n\nIf `npm run dev` says “Port 3000 is in use, trying another one…”, **stop the old server**.\nExcel will keep loading whatever is on `https://localhost:3000/`.\n\n```bash\nlsof -nP -iTCP:3000 -sTCP:LISTEN\n# then kill the PID, or just stop the process in the terminal running it\n```\n\n#### Sideload troubleshooting\n\nIf `npm run sideload` fails with `EEXIST: file already exists, link \'manifest.xml\' -> ...`:\n\n```bash\nnpx office-addin-debugging stop manifest.xml desktop\nnpm run sideload\n```\n\n#### “I updated models but they don’t show up” checklist\n\n1) **Provider filter:** the model picker only shows models for **connected providers** (saved API key/OAuth). Make sure the provider is connected.\n2) **Excel caching:** quit Excel completely (Cmd+Q) and reopen.\n3) **Hot reload note:** taskpane JS/CSS is served from Vite; edits to model-selection files (`src/models/model-ordering.ts`, `src/taskpane/default-model.ts`, `src/compat/model-selector-patch.ts`) should apply via HMR without needing to re-sideload, as long as Excel is pointed at the same running dev server.\n4) **Vite optimized deps:** after dependency bumps, clear and restart:\n\n```bash\nrm -rf node_modules/.vite\nnpm run dev\n```\n\n### 7) Update this doc’s date\n\nBump `Last verified:` at the top to today’s date when you finish.\n',De=`# Python / LibreOffice bridge contract (v1)

Status: implemented as an optional **local helper** (native bridge). \`python_run\` and \`python_transform_range\` also support in-browser Pyodide fallback.

- Add-in adapters:
  - \`src/tools/python-run.ts\` (\`python_run\`)
  - \`src/tools/libreoffice-convert.ts\` (\`libreoffice_convert\`)
  - \`src/tools/python-transform-range.ts\` (\`python_transform_range\`)
- Local helper:
  - \`scripts/python-bridge-server.mjs\`

## Gate model

Bridge-backed tools remain registered (stable tool list / prompt caching).

Native bridge usage requires:

1. effective bridge URL is resolved (configured override via \`/experimental python-bridge-url <url>\`, else default \`https://localhost:3340\`)
2. bridge \`GET /health\` succeeds
3. user confirms the first Python/LibreOffice execution per effective bridge URL

Notes:
- \`libreoffice_convert\` is bridge-only and blocked when these checks fail.
- \`python_run\` / \`python_transform_range\` can still execute via Pyodide fallback when checks fail (for example, no override is set and the default bridge URL is offline).

Optional bearer auth:

- Set \`PYTHON_BRIDGE_TOKEN\` when starting the bridge
- Configure \`/experimental python-bridge-token <token>\`
- Stored key: \`python.bridge.token\`

---

## Local bridge quickstart

\`\`\`bash
# One-command setup (real local execution mode by default)
npx pi-for-excel-python-bridge

# Optional assisted dependency install (macOS/Homebrew)
npx pi-for-excel-python-bridge --install-missing

# Force safe simulated mode
PYTHON_BRIDGE_MODE=stub npx pi-for-excel-python-bridge

# Source checkout alternative
npm run python:bridge:https
\`\`\`

Real-mode requirements:

- \`python3\` must be installed and discoverable on \`PATH\` (or set \`PYTHON_BRIDGE_PYTHON_BIN\`)
- LibreOffice (\`soffice\` / \`libreoffice\`) is optional for \`python_run\`, but required for \`libreoffice_convert\`
- \`--install-missing\` can install missing dependencies on macOS/Homebrew

Then in the add-in:

\`\`\`bash
# optional URL override (default is already https://localhost:3340)
/experimental python-bridge-url <url>
# optional
/experimental python-bridge-token <token>
\`\`\`

Or use the extensions UI: \`/extensions\` → **Connections** → **Python bridge**.

Bridge endpoints:

- \`GET /health\`
- \`POST /v1/python-run\`
- \`POST /v1/libreoffice-convert\`

High-level add-in helper tool:

- \`python_transform_range\` (read range → run Python → write transformed output)

---

## \`POST /v1/python-run\`

### Request

\`\`\`json
{
  "code": "result = {'rows': [[1,2],[3,4]]}",
  "input_json": "{\\"source\\":\\"Sheet1!A1:B2\\"}",
  "timeout_ms": 10000
}
\`\`\`

### Response

\`\`\`json
{
  "ok": true,
  "action": "run_python",
  "exit_code": 0,
  "stdout": "...",
  "stderr": "...",
  "result_json": "{\\"rows\\":[[1,2],[3,4]]}",
  "truncated": false
}
\`\`\`

Notes:

- In real mode, Python is executed locally (\`python3\` by default) with \`-I\` isolation flag.
- \`input_json\` is exposed to Python code as \`input_data\`.
- If code sets a \`result\` variable (JSON-serializable), bridge returns it as \`result_json\`.

---

## \`POST /v1/libreoffice-convert\`

### Request

\`\`\`json
{
  "input_path": "/absolute/path/source.xlsx",
  "target_format": "pdf",
  "output_path": "/absolute/path/source.pdf",
  "overwrite": true,
  "timeout_ms": 60000
}
\`\`\`

### Response

\`\`\`json
{
  "ok": true,
  "action": "convert",
  "input_path": "/absolute/path/source.xlsx",
  "target_format": "pdf",
  "output_path": "/absolute/path/source.pdf",
  "bytes": 12345,
  "converter": "soffice"
}
\`\`\`

Supported \`target_format\`: \`csv\`, \`pdf\`, \`xlsx\`.

Notes:

- In real mode the bridge shells out via argv (no shell interpolation):
  \`soffice --headless --convert-to <format> --outdir <tmpDir> <input>\`
- \`input_path\` / \`output_path\` must be absolute.

---

## Security posture

- Loopback-only client enforcement (\`127.0.0.1\` / \`::1\`)
- Origin allowlist (\`ALLOWED_ORIGINS\`; defaults include dev + hosted add-in origins)
- Optional bearer token auth for POST endpoints
- Request body + code/input/output size limits
- Timeout enforcement for Python and LibreOffice subprocesses

---

## Tool execution policy

\`python_run\` and \`libreoffice_convert\` are classified as **read / no workbook context impact**.

\`python_transform_range\` is classified as **mutate / content impact** because it writes transformed output into workbook cells.
`,Oe=`# v0.7.0-pre release notes

_Pre-release. Changes since \`v0.6.1-pre\`._

## Highlights

- **New add-ons and skills management UX**
  - Added a top-level **Add-ons** surface.
  - Added a **Skills catalog manager** and external-skill install/remove controls.
  - Added per-skill enable/disable controls and stale-cache handling for disabled skills.

- **OAuth improvements**
  - Added browser-safe OAuth flow for **OpenAI (ChatGPT)**.
  - Added browser-safe OAuth flows for **Google** providers.
  - Updated login guidance/docs for manual callback URL pasting where needed.

- **Files workspace improvements**
  - Added a **folder tree view** in the Files dialog.
  - Added stale scratch-file cleanup behavior.
  - Scoped workspace-context refresh to relevant artifacts.

## UX, accessibility, and safety

- Ran a broad sidebar/UI polish pass (focus, motion, semantics, labeling).
- Fixed context debug pill accessibility semantics:
  - header uses semantic button behavior,
  - now exposes \`aria-expanded\` and \`aria-controls\`.
- Added regression coverage to guard context-pill ARIA wiring.
- Improved confirm-mode safety behavior when \`window.confirm\` is unavailable:
  - overlay-based approvals,
  - aborts respected while approvals are pending.

## Internal refactors

- Continued large-file modularization and extraction work in:
  - extension runtime/sandbox helpers,
  - extension API contracts/import helpers,
  - recovery format-state utilities,
  - shared bridge/network helpers.
- Bumped 联影AI 依赖 to \`0.52.12\`.

## Notes

- This is a **feature-heavy pre-release** and is versioned as a minor pre-release bump.
- Recommended validation before broader rollout:
  - \`npm run check\`
  - \`npm run build\`
  - \`npm run test:models\`
  - \`npm run test:context\`
  - \`npm run test:security\`
`,ke=`# v0.8.0-pre release notes

_Pre-release. Changes since \`v0.7.0-pre\`._

## Deploy catch-up snapshot

- Last successful Vercel deploy on \`main\`: \`b5477bf\` (2026-02-15, PR #309)
- This release batches **73 commits** since that deploy (**14 merged PRs** + 1 conflict-resolution merge commit)

## Highlights

- **Extensions + settings consolidation**
  - Tabbed Settings flow (\`Logins\`, \`Extensions\`, \`More\`)
  - Unified Extensions Hub promoted to primary surface
  - Skills external discovery graduated from experimental mode

- **Default-on integrations and web search improvements**
  - External tools now default to enabled
  - Web search now defaults to enabled
  - Jina added as the zero-config default provider, with fallback support and centralized endpoint host policy wiring

- **Files workspace overhaul (phase 1 + phase 2)**
  - Redesigned list/detail layout and simplified interaction model
  - Dual-source sections for workbook files and connected folders
  - Tree structure + folder grouping per section
  - Better guards around unsupported folder actions and path-only mutations

- **Local bridge UX and packaging upgrades**
  - Added/published \`pi-for-excel-python-bridge\` and \`pi-for-excel-tmux-bridge\` launcher packages
  - Default localhost bridge URLs and real-mode npx launchers
  - Kept Pyodide fallback available when the default bridge is offline
  - Graduated tmux from experimental gating in the settings flow

- **UI polish + consistency pass**
  - Replaced gear/add-ons emoji icons with Lucide SVG icons
  - Improved overlay/copy consistency and settings/disclosure parity
  - Removed \`window.confirm\` dependency in favor of overlay confirmations

- **Deploy policy restored and locked with tests**
  - Re-enabled normal Vercel auto-deploy behavior for \`main\` + PR previews
  - Kept non-PR feature branch deploys skipped
  - Added cross-platform regression coverage for \`ignoreCommand\`

## Internal quality work

- Continued large-file extraction/modularization work in UI/recovery/extensions paths.
- Added/expanded tests in extensions overlay DOM, proxy precedence, UI menu labels, and Vercel deploy policy behavior.

## Notes

- This is a **minor pre-release bump** due broad feature/delivery scope since \`v0.7.0-pre\`.
- Recommended validation before broader rollout:
  - \`npm run check\`
  - \`npm run build\`
  - \`npm run test:models\`
  - \`npm run test:context\`
  - \`npm run test:security\`
`,Ae=`# v0.9.0-pre release notes

_Pre-release. Changes since \`v0.8.0-pre\`._

## Snapshot since last release

- Previous release tag: \`v0.8.0-pre\` (\`ba33117\`, 2026-02-16)
- This release includes **75 first-parent commits** (**72 merged PRs**) on \`main\`

## Highlights

- **Bridge setup UX is now first-class and self-healing**
  - Added \`## Local Services\` prompt context with bridge health state at session start (#447)
  - Added inline setup cards for Python/tmux bridge failures in chat (#451)
  - Bridge gate failures now return structured tool results (\`gateReason\`, \`skillHint\`) instead of throws (#450)
  - Tightened setup guidance and a11y announcements (\`aria-live\`) for setup status regions (#452)

- **Connections got safer and more deterministic**
  - Added extension connection contract + preflight path, plus \`/tools → Connections\` UX (#421, #426)
  - Migrated web-search keys + MCP tokens into connection storage flows (#432, #433)
  - Hardened auth-error redaction and rollback behavior on metadata/token persistence failures (#435, #440)
  - Added proactive setup guidance tests and follow-up hardening for extension connection refresh paths (#430, #437)

- **Context + model behavior became more cache-stable**
  - Added prefix-churn observability counters and baseline/runbook docs (#431, #439)
  - Reduced unnecessary runtime/tool refresh churn with no-op skips + revision tracking (#425, #436, #446)
  - Preserved full tool disclosure for prompt-cache continuity (#423)
  - Model-switch behavior now defaults to **in-place** for active sessions, with fork kept as opt-in (#443)

- **Web search and external integrations improved**
  - Added inline setup card UX for web search failures (#416)
  - Added Firecrawl provider and tightened Jina provider behavior (API key required) (#413)
  - Improved proxy-down error guidance for \`web_search\`, \`fetch_page\`, and MCP paths (#396, #398)

- **Broad UX reliability polish**
  - Improved streaming auto-follow behavior and reduced status-tooltip jitter (#397, #401, #403, #408)
  - Improved abort UX and preserved draft recovery (\`Alt+Up\`) after aborts (#407, #418)
  - Disabled accidental dollar-delimited math parsing in markdown rendering (#405)
  - Continued UI consistency polish (icons, status/footer structure, copy cleanup) (#402, #404)

## Platform, security, and maintainer updates

- Fixed Office WebView CSP compatibility by stubbing Ajv unsafe-eval paths and follow-up bridge diagnostics hardening (#364, #366)
- Upgraded lint/tooling baseline to ESLint 10 and aligned Node engine constraints (#385, #386)
- Refreshed 联影AI 模型注册表/dependencies to \`0.54.0\` and added lockstep automation in CI (#387, #388)

## Notes

- This is a **minor pre-release bump** due breadth of shipped UX/runtime changes since \`v0.8.0-pre\`.
- Recommended validation before broader rollout:
  - \`npm run check\`
  - \`npm run build\`
  - \`npm run test:models\`
  - \`npm run test:context\`
  - \`npm run test:security\`
`,je=`# v0.9.1-pre release notes

_Pre-release. Changes since \`v0.9.0-pre\`._

## Highlights

- **Skills can now be self-authored from chat**
  - Extended core \`skills\` tool with \`install\` and \`uninstall\` actions.
  - \`skills install\` writes managed external skills to \`skills/external/<name>/SKILL.md\`.
  - \`skills uninstall\` removes managed external skills by name.
  - Tool now emits structured install/uninstall metadata for consistent UI rendering.
  - Skill-catalog updates dispatch runtime refresh events and invalidate stale skill-read cache entries.

- **Bundled extension-authoring guidance**
  - Added bundled \`extending-pi\` skill (\`skills/extending-pi/SKILL.md\`).
  - Added secure API-extension template guide (\`docs/extensions-secure-connection-bundle.md\`).
  - Guidance now defaults to \`/tools → Connections\` secret setup and host-managed auth flows.

- **Connection auth architecture hardening (Option B)**
  - Added host-injected auth path for extension \`http.fetch(..., { connection })\`.
  - Connection definitions now support \`httpAuth\` with strict \`allowedHosts\` allowlists.
  - Host enforces owner scoping + host allowlist before injecting auth headers.
  - 401/403 responses mark the connection as runtime auth-failed and surface structured connection errors.

- **Advanced secret-read escape hatch (capability-gated)**
  - Added \`connections.getSecrets(connectionId)\` for advanced/non-standard auth flows.
  - Added dedicated extension capability: \`connections.secrets.read\`.
  - Capability is treated as higher-risk and defaults to disabled.

## Notes

- This is a focused pre-release increment for issue #454:
  - self-authored skills from chat
  - bundled extension-authoring skill
  - secure connection/auth model improvements
`,Me=`# v0.9.2-pre release notes

_Pre-release. Changes since \`v0.9.1-pre\`._

## Highlights

- **Custom OpenAI-compatible gateways can now declare their real context window**
  - Added a **最大上下文令牌数** field in Settings → Providers → Custom OpenAI-compatible gateways.
  - 自定义网关 cards now show the configured local context budget.
  - 联影AI 现在使用 that configured value for local context budgeting, status-bar context math, and auto-compaction thresholds.
  - Restored sessions and live runtimes refresh custom gateway model metadata from the latest saved gateway configuration.

## Notes

- This release addresses issue #522.
- Thanks to @lifeishimeizi for the report, repro, and feature suggestion.
`,Ne=`# v0.9.3-pre release notes

_Pre-release. Changes since \`v0.9.2-pre\`._

## Highlights

- **GPT-5.5 is now the preferred default when OpenAI is available**
  - Refreshed the 联影AI 技术栈 to \`0.70.0\` and pulled the latest model registry through \`@earendil-works/pi-ai\`.
  - Updated model ordering/default selection for GPT-5.5, GPT-5.x/Codex variants, Claude Opus/Sonnet 4.x, Gemini 3/3.1, namespaced IDs, dotted IDs, and date-suffixed model families.
  - Hardened parser fallbacks so parameter-size suffixes and embedded dates do not accidentally outrank newer model families.

- **Browser OAuth logins are repaired for Office WebView**
  - Added a browser-safe Anthropic Claude Pro/Max OAuth flow instead of using 联影AI 的仅 Node callback-server provider.
  - Fixed the Anthropic client ID typo and routed the current \`platform.claude.com\` token endpoint through dev/prod proxy plumbing.
  - Updated OpenAI Codex browser OAuth to match the current official Codex CLI request shape more closely: connector scopes, \`originator=codex_cli_rs\`, Codex CLI simplified flow, 64-byte PKCE verifier, and access-token account-claim validation.
  - Versioned stored OpenAI Codex OAuth credentials so old identity-only grants are cleared and users are forced through the fresh authorize flow instead of silently refreshing insufficient scopes.
  - Updated the local proxy and Vite dev proxy to strip browser-only headers before forwarding OAuth token exchanges.

- **自定义网关 and overlay polish**
  - Fixed deletion of custom OpenAI-compatible gateway API keys.
  - Improved nested overlay Escape handling so confirmation dialogs do not accidentally close the wrong overlay.

## Dependency and security notes

- 联影AI 包 (\`@earendil-works/pi-ai\`, \`@earendil-works/pi-agent-core\`, \`@earendil-works/pi-web-ui\`) remain in lockstep at \`0.70.0\`.
- Targeted npm overrides keep high/critical audit findings clear without broad dependency downgrades.
- The local OAuth CORS proxy package version is bumped to \`0.2.3-pre\` for the updated allowlist/header-forwarding behavior.

## Verification

- \`node --test --experimental-strip-types --import ./scripts/register-test-ts-loader.mjs tests/browser-oauth.test.ts\`
- \`node --test --experimental-strip-types tests/cors-proxy-server.security.test.mjs tests/oauth-proxy-routing.test.ts\`
- \`npm run test:models\`
- \`npm run test:context\`
- \`npm run test:security\`
- \`npm run check\`
- \`npm run build\`
- Manual Excel OAuth smoke: Anthropic Claude Pro/Max and OpenAI Codex browser OAuth from the local sideloaded taskpane.

## Commit range reviewed

Since \`v0.9.2-pre\`, this release incorporates:

- \`0711084\` — refresh 联影AI 模型注册表/model selection and 联影AI 依赖.
- \`b91eed0\` — fix custom gateway API key deletion and nested overlay Escape behavior.
- \`1157851\` — default to GPT-5.5 and repair browser OAuth plumbing.
- \`97b7b0a\` — align browser OAuth client parameters.
- This release patch — match current official Codex CLI OAuth details and harden proxy header stripping.
`,Pe='# v0.9.4-pre release notes\n\n_Pre-release. Changes since `v0.9.3-pre`._\n\n## Highlights\n\n- **Claude Fable 5 support**\n  - `claude-fable-5` — Anthropic\'s new flagship (1M-token context window, adaptive thinking, `xhigh` effort) — is now available in the model picker for Anthropic users.\n  - Fable is the new top Anthropic family in picker ordering and featured models (latest Fable first, then the existing Sonnet/Opus rules).\n  - Default model selection prefers the latest Fable when its version is at least as new as Opus and Sonnet, so Anthropic-connected users get Fable 5 by default.\n\n- **Refreshed model registry (联影AI 技术栈 `0.70.0` → `0.79.1`)**\n  - Pulled the latest model registry through `@earendil-works/pi-ai`. New models in this range include Claude Fable 5 and Claude Opus 4.8, plus updated registry metadata across the Anthropic, OpenAI, and Google providers.\n  - Note: `gpt-5.3-codex` moved off the ChatGPT (`openai-codex`) provider upstream; it remains available via the OpenAI API provider.\n\n- **OAuth login fixes**\n  - Device-code logins (GitHub Copilot) now show the verification code in a copyable dialog and open the verification page — previously the code was never displayed.\n  - Added support for selection prompts in OAuth flows (button-based dialog), required by the updated 联影AI auth surface.\n\n## Dependency and security notes\n\n- 联影AI 包 migrated to the `@earendil-works` npm namespace (previously `@mariozechner`).\n- `@earendil-works/pi-ai` and `@earendil-works/pi-agent-core` are pinned together at `0.79.1`; `@earendil-works/pi-web-ui` stays at `0.75.3` (the newest published version — upstream stopped publishing it in lockstep).\n- A root npm override guarantees a **single shared `pi-ai` copy** (one model registry), so the model picker and the runtime always agree about available models. `npm run check:pi-lockstep` enforces this invariant.\n- No changes to the local proxy / bridge packages in this release.\n\n## Known quirk\n\n- Claude Fable 5 rejects requests with thinking explicitly disabled (`thinking.type: "disabled"`). The add-in\'s agent runtime omits the thinking parameter when the thinking level is "off" (the API then defaults to adaptive thinking), so every thinking level in the picker works. This matches upstream 联影AI behavior.\n\n## Verification\n\n- `npm run check` (incl. the new 联影AI 依赖 policy check)\n- `npm run test:models` (38/38)\n- `npm run test:context` (648/648)\n- `npm run test:security` (46/46)\n- `npm run test:recovery`\n- `npm run build`\n- Live API round-trip with `claude-fable-5` through the bundled `pi-ai` driver (real completion, adaptive thinking with `xhigh` effort).\n- Browser end-to-end against the dev-server taskpane: Fable 5 selected as default, listed first/featured in the model picker, and completed a live streamed chat turn with usage/cost and 1M-context tracking; no console or page errors.\n\n## Commit range reviewed\n\nSince `v0.9.3-pre`, this release incorporates:\n\n- `fffefb1` — migrate 联影AI 包 to the `@earendil-works` namespace (#542).\n- `80671a0` — fix overlapping Dependabot npm config (#544).\n- `599fd9e` — refresh 联影AI 技术栈 to `0.75.3` (#559).\n- `b9e0dbf` — add Claude Fable 5 model support, 联影AI 技术栈 `0.79.1`, dependency single-registry policy, OAuth device-code/select dialogs (#563).\n',Fe=`# v0.9.5-pre release notes

_Pre-release. Changes since \`v0.9.4-pre\`._

## Highlights

- **Anthropic default restored to Opus**
  - Anthropic-only setups now default to the latest Opus (\`claude-opus-4-8\`) instead of \`claude-fable-5\`, because Fable is present in the registry but currently unavailable for normal Anthropic use.
  - Sonnet and Fable remain fallback candidates if Opus is absent.
  - The model picker can still surface Fable in its featured ordering; this release only changes default selection.

- **Small-context model resilience**
  - Added graceful handling for context-overflow cases with small-context-window models, so failures are surfaced more cleanly instead of derailing the session path.

- **CI/dependency maintenance**
  - Upgraded Vite to \`8.0.16\`, clearing the high-severity esbuild audit finding reported by CI.
  - Added a manifest-validation wrapper that retries Microsoft validation service 5xx/unreachable responses and soft-passes only repeated service outages; actual manifest validation errors still fail.
  - Incorporated routine dependency maintenance from Dependabot.

## Verification

- \`npm run validate\` (Microsoft validation service returned 502 locally; wrapper retried and soft-passed as external outage)
- \`npm audit --audit-level=high\`
- \`npm run test:models\`
- \`npm run check\`
- \`npm run build\`

## Commit range reviewed

Since \`v0.9.4-pre\`, this release incorporates:

- \`1ddb213\` — fix(proxy): keep our CORS headers when copying upstream response headers (#555).
- \`6c6406f\` — chore(deps): bump hono from 4.12.18 to 4.12.25 (#564).
- \`45f0fda\` — chore(deps): bump actions/dependency-review-action from 4 to 5 (#548).
- \`6495a1a\` — chore(deps): bump the npm-minor-and-patch group across 1 directory with 7 updates (#561).
- \`c57a736\` — graceful context-overflow handling for small-context-window models (#567).
- \`b9d2722\` — default Anthropic model selection to Opus (#576).
`,Ie=`# Release Smoke Test Checklist

Reproducible smoke pass for pre-release builds.

Use this checklist before removing the **Experimental** badge or publishing a release candidate.

## Scope

This checklist maps directly to issue [#179](https://github.com/tmustier/pi-for-excel/issues/179):

- Landing-page claim validation
- Prompt example validation
- Install + connect flow validation
- High-risk hardening paths (error handling, stress, storage corruption)

## Run logs

- Store run evidence in \`docs/release-smoke-runs/\`.
- Host run templates live in \`docs/release-smoke-runs/templates/\`.
- Latest preflight run: \`docs/release-smoke-runs/2026-02-14-macos-preflight.md\`.
- Latest CLI validation run: \`docs/release-smoke-runs/2026-02-14-cli-validation.md\`.
- Latest H-1 hostless error-path run: \`docs/release-smoke-runs/2026-02-13-macos-h1-hostless-error-path.md\`.

## Prerequisites

- Built from latest \`origin/main\`
- Excel add-in sideloaded from \`https://localhost:3000\`
- \`npm ci\`
- Local cert trusted (\`mkcert\` flow)
- Optional local bridges available when testing power-user paths:
  - tmux bridge (\`scripts/tmux-bridge-server.mjs\`)
  - python/libreoffice bridge (\`scripts/python-bridge-server.mjs\`)

## Preflight (must pass first)

Run in repo root:

1. \`npm run check\`
2. \`npm run build\`
3. \`npm run test:models\`
4. \`npm run test:context\`
5. \`npm run test:security\`

Record run date and commit SHA in the evidence table below.

### Context/cache instrumentation sanity (for context-shape changes)

Run this add-on check when the release includes changes to model context composition (system prompt, tool disclosure, toolset refresh, compaction, or context injection).

References:
- baseline matrix: \`docs/cache-observability-baselines.md\`
- run template: \`docs/release-smoke-runs/templates/context-cache-telemetry-template.md\`

1. Enable debug mode.
2. Run a deterministic mini-session (≥5 calls, including at least one tool loop).
3. Record prefix churn counters (\`prefixChanges\`, \`prefixModelChanges\`, \`prefixSystemPromptChanges\`, \`prefixToolChanges\`).
4. Compare observed \`prefixChangeReasons\` to baseline expectations for each trigger.
5. Confirm each non-zero reason has an intentional trigger in the scenario.

If churn is unexpected, treat as a release blocker until explained or fixed.

## Environment matrix

- macOS Excel Desktop: **required**
- Windows Excel Desktop: **required (at least one pass)**
- Excel Web: optional sanity pass

## Evidence table template

| ID | Area | Platform | Status (Pass/Fail/Blocked) | Evidence (screenshot/log link) | Notes |
|---|---|---|---|---|---|
| PRE-1 | Preflight command suite | macOS |  |  |  |
| C-1 | Workbook read/selection awareness | macOS |  |  |  |
| C-2 | Session tabs + restore | macOS |  |  |  |
| C-3 | Checkpoint + undo | macOS |  |  |  |
| C-4 | Conventions influence formatting | macOS |  |  |  |
| C-5 | Extension authoring + widget | macOS |  |  |  |
| P-1 | "Clean data + summary" prompt | macOS |  |  |  |
| P-2 | "Assumptions + web search + PDFs" prompt | macOS |  |  |  |
| P-3 | "FX rates + build extension" prompt | macOS |  |  |  |
| P-4 | "tmux ask Claude Code" prompt | macOS |  |  |  |
| I-1 | macOS install flow | macOS |  |  |  |
| I-2 | Windows install flow | Windows |  |  |  |
| I-3 | API key flow | macOS + Windows |  |  |  |
| I-4 | Proxy/login flow | macOS + Windows |  |  |  |
| H-1 | Error-path matrix | macOS |  |  |  |
| H-2 | Large workbook stress | macOS |  |  |  |
| H-3 | Proxy security defaults audit | macOS |  |  |  |
| H-4 | Corrupt SettingsStore / quota handling | macOS |  |  |  |

## Landing-page core claim checks

### C-1. Workbook awareness
Prompt:

> Read this workbook and summarize: sheet structure, key formulas, current selection, and any obvious data quality risks.

Expected:

- Mentions current worksheet names and selection
- Calls out formulas (not only values)
- No hallucinated sheet names

### C-2. Multi-tab + history restore

Steps:

1. Open three tabs
2. Send one message in each
3. Close middle tab
4. Reload taskpane

Expected:

- Tab order persisted
- Closed tab recoverable via recent-history flow
- Message history restored per tab

### C-3. Automatic checkpoint + one-click undo

Steps:

1. Ask agent to mutate a range (values + formatting)
2. Open recovery/history UI
3. Trigger restore of the latest checkpoint

Expected:

- Checkpoint created for mutation
- Restore reverts change
- Inverse checkpoint created for redo safety

### C-4. Conventions are honored

Steps:

1. Use \`/rules\` to set non-default font/header/format conventions
2. Ask agent to format a target range

Expected:

- Applied style reflects configured conventions
- No fallback to old defaults when conventions are valid

### C-5. Self-extension flow

Prompt:

> Create and install an extension that renders a sidebar widget with one button that writes "OK" to A1.

Expected:

- Extension installs via \`extensions_manager install_code\`
- Widget renders and action works
- Errors are user-readable if capability is denied

## Prompt example checks

### P-1. Data cleanup + summary
Prompt:

> I 粘贴d raw data in Sheet2. Clean it up, figure out what it is, and build me a summary.

Expected:

- Uses workbook tools directly
- Produces deterministic cleanup steps + summary output

### P-2. Model assumptions + web search + PDFs
Prompt:

> What assumptions is this model making? Walk me through the logic. Cross-check with web search and the PDFs.

Expected:

- Uses \`trace_dependencies\` / \`explain_formula\`
- Uses web search/fetch tools when configured
- If PDF bridge missing, explains setup path clearly (no silent failure)

### P-3. FX rates + extension generation
Prompt:

> Fetch today's FX rates and update the currency column, then build an /fx extension to do that automatically.

Expected:

- Initial update succeeds via available tools
- Generated extension uses extension APIs correctly
- Extension runs without manual file surgery

### P-4. tmux + external coding agent
Prompt:

> Use tmux to ask Claude Code to build & open a webpage based on this file's analysis.

Expected:

- If bridge enabled/configured: executes and returns transcript/output
- If not configured: provides explicit enablement steps

## Install + connect checks

### I-1. macOS install from scratch

Follow \`docs/install.md\` exactly on clean state.

Expected:

- Manifest sideload works
- Add-in appears and launches

### I-2. Windows install from scratch

Follow Windows section in \`docs/install.md\` on clean machine/profile.

Expected:

- Add-in appears and launches
- TLS/proxy/login guidance is sufficient

### I-3. API key flow

Expected:

- Key entry accepted
- First response succeeds
- Invalid key path returns actionable error

### I-4. Proxy/OAuth flow

Steps:

1. Start proxy (\`内置代理已集成\`)
2. Enable proxy in settings
3. \`/login\`
4. Send provider-backed prompt

Expected:

- Login completes
- Prompt works through proxy
- Proxy-down state shows deterministic remediation

## Hardening checks

### H-1. Error-path matrix

Automated baseline coverage exists in \`tests/error-path-matrix.test.ts\` (wrong key, expired token, proxy-down transport, rate-limit errors, network disconnect). Still run the host/manual matrix below for UX behavior validation.

For a focused desktop-Excel pass, use \`docs/release-smoke-runs/templates/macos-h1-host-operator-template.md\`.

Validate these explicit failures:

- wrong API key
- expired OAuth token
- proxy enabled but down
- rate-limit during streaming
- network disconnect mid-stream

Expected: user sees explicit status/error + next action, no frozen spinner.

### H-2. Large workbook stress

Use workbook with >=10k rows and wide formatted ranges.

Expected:

- Context injection remains responsive
- No runaway token usage / no taskpane lockup

### H-3. Proxy security defaults audit

Verify production-safe defaults remain strict in:

- \`scripts/proxy-target-policy.mjs\`
- \`scripts/cors-proxy-server.mjs\`

Expected:

- No permissive \`ALLOW_ALL_TARGET_HOSTS=1\` defaults
- Strict origin + target host constraints

### H-4. Storage corruption tolerance

Simulate bad JSON / missing settings entries / quota pressure.

Expected:

- App boots
- Fallback behavior is deterministic
- User-facing messaging explains reset/recovery path
`,Le=`# Security threat model (v1)

This document summarizes what 联影AI_Base_PI stores, where data flows, and key trust boundaries.

## Scope

- Excel taskpane app in Office webviews (WKWebView/WebView2/browser)
- Hosted static build + optional local helper services (CORS proxy, tmux bridge, Python bridge)
- Credential flows (API keys + browser OAuth)
- Extension runtime model (host vs sandbox)

## Sensitive data

- Provider API keys (IndexedDB \`ProviderKeysStore\`)
- OAuth credentials (IndexedDB settings \`oauth.<provider>\`)
- Workbook contents read by tools
- Conversation/session history (IndexedDB)

## Storage model

- API keys: IndexedDB store via pi-web-ui storage backend
- OAuth credentials: IndexedDB settings (\`oauth.<provider>\`)
- Sessions/settings: IndexedDB

### User controls

- \`/login\` can add/replace/disconnect providers
- Disconnect removes provider key and OAuth credentials for that provider
- \`/settings\` includes API key + proxy configuration

## Network model

Taskpane communicates with:
- Office JS CDN (\`appsforoffice.microsoft.com\`)
- configured model/OAuth providers
- optional local HTTPS proxy (\`https://localhost:<port>\`)
- optional local bridge services (tmux / Python)

Hosted taskpane is protected with CSP in \`vercel.json\` (scripts/styles/fonts/connect constrained to required endpoints).

## Trust boundaries

1. **Taskpane webview** (untrusted workbook/model text can enter UI)
2. **Local helper services** (proxy/bridges are separate trust boundaries)
3. **Remote providers** (LLM + OAuth endpoints)
4. **Extension runtime boundary** (host runtime vs sandbox iframe runtime)

## Main threats and current controls

### 1) XSS/content injection in markdown/UI
- Marked safety patch blocks unsafe link protocols
- Markdown images are rendered as links (no automatic \`<img>\` fetch)
- Dynamic HTML sinks use escaping helpers where needed
- CSP reduces script/connect exfil paths

### 2) Token leakage via browser storage/logs
- OAuth credentials are stored in IndexedDB settings (no legacy localStorage fallback)
- No intentional token logging in auth restore/proxy paths
- Provider disconnect clears both API key and OAuth credentials

### 3) Local proxy / bridge abuse (CORS/SSRF/local attack surface)
- Loopback client requirement
- Allowed-origin CORS allowlist
- Strict target filtering/allowlists for proxy traffic
- Optional bearer-token auth on tmux/python bridge POST endpoints
- Bounded payload sizes + execution timeouts in helper servers

### 4) Extension code execution risks
- Remote \`http(s)\` extension URLs are blocked by default (\`/experimental on remote-extension-urls\` required)
- Untrusted extension sources (inline code + remote URL) run in sandbox iframe runtime by default
- Rollback kill switch exists for maintainers (\`/experimental on extension-sandbox-rollback\`) and should be temporary only
- Capability permissions are persisted per extension (\`extensions.registry.v2\`)
- Capability enforcement is feature-flagged via \`/experimental on extension-permissions\`

## Known limitations

- IndexedDB is not an XSS boundary; same-origin script execution can read stored credentials.
- Built-in/local-module extensions are trusted and run in host runtime.
- Capability policy enforcement is opt-in (\`extension-permissions\` flag) in current rollout.
- Sandbox runtime intentionally limits API surface (for example, no raw \`api.agent\` in sandbox).
- Host-specific CSP behavior still needs smoke testing across Excel macOS/Windows/Web.
- Tool-argument schema validation is intentionally disabled in Office builds (Ajv uses runtime code generation blocked by Office CSP, so the browser build aliases Ajv to stubs).

## Operational guidance

- Prefer localhost HTTPS proxy only; remote proxies can observe prompts/tokens.
- Keep dependencies updated (CI + Dependabot + audit checks).
- When adding new outbound endpoints, update CSP + proxy/docs/tests in the same PR.
`,Re=`# Tmux bridge contract (v1)

Status:
- Add-in adapter implemented in \`src/tools/tmux.ts\`
- Local bridge scaffold implemented in \`scripts/tmux-bridge-server.mjs\`

The bridge supports two modes:
- \`tmux\`: real tmux subprocess backend with guardrails
- \`stub\`: in-memory tmux simulation for development/testing (does not execute shell commands)

Notes:
- The one-command helper (\`npx pi-for-excel-tmux-bridge\`) defaults to \`tmux\` mode.
- The raw server script keeps \`stub\` as its default for local development/test usage.

## Availability and gating

The \`tmux\` tool remains registered (stable tool list / prompt caching), but execution is blocked unless all gates pass:

1. effective bridge URL is resolved (configured override via \`/experimental tmux-bridge-url <url>\`, else default \`https://localhost:3341\`)
2. bridge \`GET /health\` returns success

The gate is checked on each tool execution (defense in depth).

## Local bridge quickstart

\`\`\`bash
# One-command setup (real tmux mode by default)
npx pi-for-excel-tmux-bridge

# Optional assisted dependency install (macOS/Homebrew)
npx pi-for-excel-tmux-bridge --install-missing

# Force safe simulated mode
TMUX_BRIDGE_MODE=stub npx pi-for-excel-tmux-bridge

# Source checkout alternative
npm run tmux:bridge:https
\`\`\`

Real-mode requirement:

- \`tmux\` must be installed and discoverable on \`PATH\`
- \`--install-missing\` can install \`tmux\` on macOS/Homebrew

Then in the add-in:

\`\`\`bash
# optional URL override (default is already https://localhost:3341)
/experimental tmux-bridge-url <url>
/experimental tmux-status
\`\`\`

Optional auth token:

\`\`\`bash
TMUX_BRIDGE_TOKEN=your-secret npx pi-for-excel-tmux-bridge
\`\`\`

Store the same token for the tool adapter:

\`\`\`bash
/experimental tmux-bridge-token <token>
\`\`\`

(setting key: \`tmux.bridge.token\`)

## Endpoints

- \`GET /health\`
- \`POST /v1/tmux\`

Content-Type: \`application/json\`

Optional auth header when configured:
- \`Authorization: Bearer <tmux.bridge.token>\`

## Request schema

\`\`\`json
{
  "action": "list_sessions | create_session | send_keys | capture_pane | send_and_capture | kill_session",
  "session": "optional session name",
  "cwd": "optional absolute working directory (create_session)",
  "text": "optional literal input (send_keys/send_and_capture)",
  "keys": ["optional key tokens, e.g. Enter, C-c"],
  "enter": true,
  "lines": 120,
  "wait_for": "optional regex string",
  "timeout_ms": 5000,
  "wait_ms": 15000,
  "join_wrapped": false
}
\`\`\`

### Action requirements enforced by the add-in/bridge

- \`list_sessions\`: no required fields
- \`create_session\`: no required fields
- \`capture_pane\`: requires \`session\`
- \`kill_session\`: requires \`session\`
- \`send_keys\`: requires \`session\` + at least one of (\`text\`, \`keys\`, \`enter=true\`)
- \`send_and_capture\`: same as \`send_keys\`
- \`wait_ms\`: optional delay (0..120000ms) before capture for \`capture_pane\`/\`send_and_capture\`

Tip: \`send_keys\` sends input only. Use \`capture_pane\` or \`send_and_capture\` when you need terminal output. For long-running jobs, set \`wait_ms\` on capture calls (for example 15000-30000) instead of tight polling loops.

## Response schema

\`\`\`json
{
  "ok": true,
  "action": "same action",
  "session": "optional resolved session",
  "sessions": ["optional list for list_sessions"],
  "output": "optional text output/capture",
  "error": "optional error string",
  "metadata": { "optional": "structured bridge metadata" }
}
\`\`\`

Notes:
- Non-2xx HTTP responses are treated as errors by the adapter.
- \`ok: false\` is treated as an error by the adapter.
- Plain-text success responses are accepted as \`output\` fallback.

## Real tmux guardrails (implemented)

- Loopback client enforcement
- Origin allowlist enforcement (\`ALLOWED_ORIGINS\`)
- Optional bearer token auth (\`TMUX_BRIDGE_TOKEN\`)
- Session name validation (strict regex)
- Key token validation (strict regex)
- \`cwd\` must be absolute and an existing directory
- Bounded request size and input lengths
- Bounded \`lines\` and \`timeout_ms\`
- tmux calls executed via argv arrays (no shell interpolation)
- tmux launched with \`-f /dev/null\` and fixed socket path

## Tool behavior in workbook runtime

\`tmux\` is classified as read-only/non-workbook traffic in \`execution-policy.ts\`, so calls do not acquire workbook write locks or trigger workbook blueprint invalidation.
`,ze=`# Upstream divergences from pi-mono

**Last reviewed:** 2026-02-22

This document records every place 联影AI_Base_PI intentionally diverges from
[pi-mono](https://github.com/badlogic/pi-mono) / \`@earendil-works/pi-coding-agent\`
behavior, with rationale and status for each.

**Philosophy:** pi-mono is our upstream and the default is to stay aligned.
Mario is thoughtful and experienced — if upstream does something a certain way,
we assume there's a good reason. We only diverge when our Excel-specific
architecture genuinely demands it, and we document every case here so divergences
don't accumulate silently.

---

## 1. Mid-session model switching (fork vs in-place)

| | pi-mono | 联影AI_Base_PI (current) |
|---|---|---|
| Empty session | Switch in place | Switch in place |
| Non-empty session (default) | Switch in place | Switch in place |
| Non-empty session (opt-in) | N/A | Fork to a new tab with the new model |

**Rationale:** When you switch models mid-conversation, the API provider's
cached prefix becomes invalid (different model = different cache key). Forking
can preserve the original tab's cache if the user switches back, but forcing
fork by default is surprising UX for many users.

**Status:** #428 introduced fork-on-non-empty. #442 changed default back to
pi-mono parity (in-place), and kept fork as an advanced opt-in setting.

- **Default:** in-place switch (parity)
- **Option:** fork to new tab for non-empty sessions

**Files:** \`src/models/switch-behavior.ts\`, \`src/taskpane/init.ts\`
(\`applyModelSelection\`, \`cloneRuntimeToNewTab\`),
\`src/commands/builtins/settings-overlay.ts\`

---

## 2. Tool refresh fingerprinting (no-op suppression)

| | pi-mono | 联影AI_Base_PI |
|---|---|---|
| When tools change | Direct \`setTools()\` on explicit user action | Event-driven capability refreshes; apply \`setTools()\` only when tool fingerprint or extension tool revision changes |

**Rationale:** This is not a disagreement with upstream — it's compensating for
a different lifecycle. 联影AI 的工具集 only changes when the user explicitly
does something (e.g. \`/tools\`). In Excel, capability refresh passes run on many
events (focus/visibility return, integrations/connections/skills/rules/execution-mode/experimental updates, extension activation).

Each refresh rebuilds tool objects. Without a guard, every pass would assign
\`agent.state.tools = ...\` even when schema metadata is identical.

We therefore gate tool updates by:
- stable metadata fingerprint (\`name\`, \`label\`, \`description\`, \`parameters\`)
- extension tool revision (increments on extension tool register/unregister/reload)

The revision keeps schema-stable hot-reload correctness (new \`execute\` handler,
same schema) without blanket eager updates on every refresh pass.

**Status:** Shipped in #436, refined in #444 with extension tool revision
tracking. Divergence remains architecture-driven.

**Files:** \`src/taskpane/runtime-utils.ts\` (\`createRuntimeToolFingerprint\`,
\`shouldApplyRuntimeToolUpdate\`), \`src/extensions/runtime-manager.ts\`
(\`getToolRevision\`), applied in \`src/taskpane/init.ts\`

---

## 3. Extension \`llm.complete\` side-session namespacing

| | pi-mono | 联影AI_Base_PI |
|---|---|---|
| Extension LLM calls | No equivalent host-side \`llm.complete\` API | Scoped to a separate session ID per extension |

**Rationale:** Extensions can make their own LLM calls independently of the main
conversation (e.g. an extension that summarises a cell selection on button
click). If these "side requests" shared the main session ID, the provider would
see an unexpected request appear mid-conversation — different system prompt,
different messages, no tools — and could invalidate the main conversation's
cache.

With namespacing, an extension's call is tagged as
\`{agentSessionId}::ext-llm:{extensionId}\` instead of the main session ID. The
provider treats it as a completely separate conversation.

**Status:** Implemented. This is new territory (pi-mono doesn't expose a
host-side \`llm.complete\` surface), not a disagreement with upstream.

**Files:** \`src/extensions/runtime-manager-helpers.ts\`
(\`createExtensionLlmCompletionSessionId\`), used in
\`src/extensions/runtime-manager.ts\` (\`runExtensionLlmCompletion\`)

---

## 4. Earlier compaction trigger for large context windows

| | pi-mono | 联影AI_Base_PI |
|---|---|---|
| Hard trigger | \`contextWindow - reserveTokens\` | \`min(contextWindow - reserveTokens, qualityCap)\` |
| Quality cap | None | 88% for ≥128k windows, 85% for ≥200k windows |
| Soft warning | None | 70% of hard trigger (floor), or hard − 5% of window |

**Rationale:** Response quality tends to degrade before you literally exhaust the
context window — the model starts losing track of earlier instructions and
context. By compacting slightly earlier (at 85–88% instead of ~92%), we trade a
small amount of raw context capacity for more consistent quality in long
sessions.

The base reserve/keep-recent defaults still mirror pi-mono (16,384 / 20,000
tokens). We only adjust *when* compaction fires, not the summarisation call
shape.

**Status:** Shipped. Documented in \`docs/context-management-policy.md\` (Slice 5)
and \`docs/compaction.md\`. The call shape (isolated summarizer request) still
matches upstream.

**Files:** \`src/compaction/defaults.ts\` (\`getCompactionThresholds\`,
\`LARGE_CONTEXT_HARD_RATIO\`, \`XL_CONTEXT_HARD_RATIO\`)

Since #566, the *trigger points* are closer to upstream again: like pi-mono's
agent-session, we now also check budgets mid-turn between tool-loop
continuations (\`Agent.prepareNextTurn\`) and run one compact-and-retry recovery
pass when a request fails with a context-overflow error
(\`src/compaction/overflow-recovery.ts\`, using pi-ai's \`isContextOverflow\`).
What still differs is the quality cap above and the simpler split-turn handling
(our compaction cuts mid-turn via \`findCutIndex\` instead of generating separate
history + turn-prefix summaries).

---

## 5. Context budgets scaled to small context windows

| | pi-mono | 联影AI_Base_PI |
|---|---|---|
| Tool output cap | fixed 50KB / 2000 lines | scaled linearly below 128k windows (floors 8KB / 200 lines) |
| Verbatim recent tool results | n/a (no model-facing shaping layer) | 6 at ≥128k, scaled down to a floor of 2 |

**Rationale:** 联影AI_Base_PI supports custom gateways with 32k–65k windows where
a single fixed-cap tool result can consume ~20% of the window. Scaling keeps
worst-case tool-loop context proportional to the model's actual capacity (#566).

**Files:** \`src/context/window-budgets.ts\`, wired in \`src/taskpane/init.ts\`
(tool truncation limits) and \`src/messages/convert-to-llm.ts\` (history shaping).

---

## Non-divergences worth noting

### Compaction call shape

Both pi-mono and 联影AI_Base_PI use the same pattern: serialize conversation to
text, send an isolated summarization request, inject the structured summary as a
user message. We considered a "cache-safe fork compaction" approach (reusing the
main runtime prefix) but **deferred** it — see
\`docs/archive/issue-424-compaction-call-shape.md\`.

### Session ID stability

Both keep \`agent.sessionId\` stable for the lifetime of a session. No divergence.

### Tool disclosure on continuations

Both include tools on every call (including tool-result continuations) so
multi-step loops work. No divergence.
`,Be=`assistant-docs`,Ve=Date.now(),He=[`docs/archive/`,`docs/release-smoke-runs/`];function Ue(e){return new TextEncoder().encode(e).byteLength}function We(e){let t=e.replaceAll(`\\`,`/`);if(t.startsWith(`./`))return t.slice(2);let n=t;for(;n.startsWith(`../`);)n=n.slice(3);return n}function Ge(e){return e===`README.md`?!0:e.startsWith(`docs/`)?!He.some(t=>e.startsWith(t)):!1}function Ke(e,t){let n=We(e);return Ge(n)?{path:`${Be}/${n}`,markdown:t}:null}function qe(e){return e!==null}function Je(){try{let e=Object.assign({"../../README.md":pe}),t=Object.assign({"../../docs/README.md":me,"../../docs/agent-skills-interop.md":he,"../../docs/cache-observability-baselines.md":ge,"../../docs/compaction.md":_e,"../../docs/context-management-policy.md":ve,"../../docs/deploy-vercel.md":ye,"../../docs/extensions-secure-connection-bundle.md":be,"../../docs/extensions.md":xe,"../../docs/files-workspace.md":Se,"../../docs/install.md":Ce,"../../docs/integrations-external-tools.md":we,"../../docs/manual-full-backups.md":Te,"../../docs/model-updates.md":Ee,"../../docs/python-bridge-contract.md":De,"../../docs/release-notes/v0.7.0-pre.md":Oe,"../../docs/release-notes/v0.8.0-pre.md":ke,"../../docs/release-notes/v0.9.0-pre.md":Ae,"../../docs/release-notes/v0.9.1-pre.md":je,"../../docs/release-notes/v0.9.2-pre.md":Me,"../../docs/release-notes/v0.9.3-pre.md":Ne,"../../docs/release-notes/v0.9.4-pre.md":Pe,"../../docs/release-notes/v0.9.5-pre.md":Fe,"../../docs/release-smoke-test-checklist.md":Ie,"../../docs/security-threat-model.md":Le,"../../docs/tmux-bridge-contract.md":Re,"../../docs/upstream-divergences.md":ze});return{...e,...t}}catch{let e=r(`../../README.md`,import.meta.url),t=r(`../../docs/**/*.md`,import.meta.url);return{...e,...t}}}function Ye(){return Object.entries(Je()).map(([e,t])=>Ke(e,t)).filter(qe).sort((e,t)=>e.path.localeCompare(t.path))}function Xe(e){return{path:b(e.path),name:e.path.split(`/`).at(-1)??e.path,markdown:e.markdown,size:Ue(e.markdown)}}var M=Ye().map(e=>Xe(e));function N(e){return{path:e.path,name:e.name,size:e.size,modifiedAt:Ve,mimeType:`text/markdown`,kind:`text`,sourceKind:`builtin-doc`,readOnly:!0}}function Ze(e){return{...N(e),text:e.markdown}}function Qe(){return M.map(e=>N(e))}function $e(e){let t=b(e),n=M.find(e=>e.path===t);return n?Ze(n):null}function P(e){let t=b(e);return M.some(e=>e.path===t)}var et=new Set([`text/html`,`application/xhtml+xml`,`image/svg+xml`,`text/javascript`,`application/javascript`]);function F(e){let t=e.trim();if(t.length===0)return`application/octet-stream`;let n=t.split(`;`,1)[0]?.trim().toLowerCase()??``;return et.has(n)?`application/octet-stream`:t}var I=`pi:files-workspace-changed`,tt=e({FilesWorkspace:()=>kt,buildWorkspaceContextSummary:()=>Ot,getFilesWorkspace:()=>jt}),L=`files.workspace.nativeHandle.v1`,R=`files.workspace.metadata.v1`,z=`files.workspace.audit.v1`,B=300,V={actor:`user`,source:`files-dialog`};function H(e){return t(e)?typeof e.showDirectoryPicker==`function`:!1}function nt(e){return t(e)?e.kind===`directory`&&typeof e.getDirectoryHandle==`function`&&typeof e.getFileHandle==`function`&&typeof e.queryPermission==`function`:!1}function U(e){return t(e)?typeof e.queryPermission==`function`&&typeof e.requestPermission==`function`:!1}function W(e){typeof document>`u`||document.dispatchEvent(new CustomEvent(I,{detail:e}))}function rt(e){let t=new ArrayBuffer(e.byteLength);return new Uint8Array(t).set(e),t}function G(e){if(!(!e||e.closed))try{e.close()}catch{}}function it(e,t){if(t&&!t.closed)try{return t.location.replace(e),!0}catch{G(t)}return window.open(e,`_blank`)!==null}function K(e){return typeof e==`string`&&e.trim().length>0}function q(e){return typeof e==`number`&&Number.isFinite(e)}function J(e){if(!(e instanceof Error))return!1;if(e.name===`NotFoundError`)return!0;let t=e.message.toLowerCase();return t.includes(`not found`)||t.includes(`not be found`)||t.includes(`cannot find`)||t.includes(`can't find`)||t.includes(`can not find`)||t.includes(`no such file`)||t.includes(`does not exist`)?!0:/\b(can\s?not|cannot|can't)\s+be\s+found\b/u.test(t)}function at(e){return e===`native-directory`||e===`opfs`||e===`memory`}function ot(e){return e===`assistant`||e===`user`||e===`system`}function st(e){return e===`list`||e===`read`||e===`write`||e===`delete`||e===`rename`||e===`import`||e===`connect_native`||e===`disconnect_native`||e===`clear_audit`}function Y(e){if(K(e))try{return b(e)}catch{return}}function ct(e){if(!t(e))return null;let n=typeof e.workbookId==`string`?e.workbookId.trim():``;if(n.length===0)return null;let r=typeof e.workbookLabel==`string`?e.workbookLabel.trim():``;return r.length===0?null:{workbookId:n,workbookLabel:r,taggedAt:q(e.taggedAt)?e.taggedAt:Date.now()}}function lt(e){let n=new Map;if(!t(e))return n;let r=e.byPath;if(!t(r))return n;for(let[e,t]of Object.entries(r)){let r=Y(e);if(!r)continue;let i=ct(t);i&&n.set(r,i)}return n}function ut(e){if(!t(e)||!st(e.action)||!ot(e.actor)||!at(e.backend)||!K(e.source))return null;let n=q(e.at)?e.at:Date.now(),r=K(e.id)?e.id:ft(),i=Y(e.path),a=Y(e.fromPath),o=Y(e.toPath),s=q(e.bytes)?e.bytes:void 0,c=K(e.workbookId)?e.workbookId.trim():void 0,l=K(e.workbookLabel)?e.workbookLabel.trim():void 0;return{id:r,at:n,action:e.action,actor:e.actor,source:e.source.trim(),backend:e.backend,path:i,fromPath:a,toPath:o,bytes:s,workbookId:c,workbookLabel:l}}function dt(e){if(!t(e))return[];let n=e.entries;if(!Array.isArray(n))return[];let r=[];for(let e of n){let t=ut(e);t&&r.push(t)}return r.sort((e,t)=>t.at-e.at).slice(0,B)}function ft(){let e=globalThis.crypto?.randomUUID;if(typeof e==`function`)return e.call(globalThis.crypto);let t=Math.floor(Math.random()*1e6).toString(36).padStart(4,`0`);return`audit_${Date.now().toString(36)}_${t}`}function pt(e){return t(e)?typeof e.get==`function`&&typeof e.set==`function`&&typeof e.delete==`function`:!1}async function X(){try{let e=(await n(()=>import(`./app-storage-Dm8sjFlO.js`).then(e=>e.n),__vite__mapDeps([0,1]))).getAppStorage(),r=t(e)?e.settings:null;return pt(r)?r:null}catch{return null}}async function mt(){let e=await X();if(!e)return null;try{let t=await e.get(L);return nt(t)?t:null}catch{return null}}async function ht(e){let t=await X();if(t)try{e?await t.set(L,e):await t.delete(L)}catch{}}async function gt(e){if(!U(e))return`unsupported`;try{return await e.queryPermission({mode:`readwrite`})}catch{return`unsupported`}}async function _t(e){if(!U(e))return`unsupported`;try{return await e.requestPermission({mode:`readwrite`})}catch{return`unsupported`}}function vt(e){switch(e){case`native-directory`:return`Local folder`;case`opfs`:return`Sandboxed workspace`;case`memory`:return`Session memory`}}var yt=`notes/`,bt=`notes/index.md`,xt=`imports/`,Z=`scratch/`,St=`assistant-docs/`,Ct=3,wt=1440*60*1e3;function Q(e){let t=e.workbookTag?.workbookId??``;return`${e.path}:${e.size}:${e.modifiedAt}:${t}`}function Tt(e){switch(e){case`workspace`:return 0;case`native-directory`:return 1;case`builtin-doc`:return 2;default:return 3}}function $(e){return[...e].sort((e,t)=>{let n=e.path.localeCompare(t.path);if(n!==0)return n;let r=Tt(e.locationKind)-Tt(t.locationKind);return r===0?t.modifiedAt-e.modifiedAt:r})}function Et(e,t){let n=Math.max(1,t),r=e.slice(0,n).map(e=>e.path);if(r.length===0)return``;let i=e.length>r.length?`, …`:``;return` (${r.join(`, `)}${i})`}function Dt(e){return e.sourceKind===`workspace`}function Ot(e){let t=e.previewLimit??Ct,n=e.snapshot.files.filter(Dt),r=$(n.filter(e=>e.path.startsWith(yt))),i=r.find(e=>e.path===bt)??null,a=$(n.filter(e=>e.path.startsWith(xt))),o=e.currentWorkbookId?$(n.filter(t=>!(t.workbookTag?.workbookId!==e.currentWorkbookId||t.path.startsWith(yt)||t.path.startsWith(xt)||t.path.startsWith(Z)||t.path.startsWith(St)))):[],s=r.length>0||a.length>0||o.length>0,c=[`backend:${e.snapshot.backend.kind}`,`workbook:${e.currentWorkbookId??`none`}`,`notes-files:${r.map(e=>Q(e)).join(`,`)}`,`imports:${a.map(e=>Q(e)).join(`,`)}`,`workbook-files:${o.map(e=>Q(e)).join(`,`)}`],l=[`### Workspace`];if(r.length>0){let e=r.length===1?`file`:`files`;i?l.push(`- notes/: ${r.length} ${e}. Read notes/index.md first.`):l.push(`- notes/: ${r.length} ${e}. No notes/index.md yet.`)}if(o.length>0){let e=o.length===1?`file`:`files`;l.push(`- Current workbook artifacts: ${o.length} ${e}${Et(o,t)}.`)}if(a.length>0){let e=a.length===1?`file`:`files`;l.push(`- imports/: ${a.length} ${e}${Et(a,t)}.`)}return s||l.push(`- No relevant workspace files for this workbook.`),l.push(`- Auto-context omits scratch/ and assistant-docs/. Use files list for full details.`),{summary:l.join(`
`),hasRelevantFiles:s,relevantSignature:c.join(`|`)}}var kt=class{constructor(e={}){this.backend=null,this.backendPromise=null,this.nativeHandle=null,this.workspaceStorageBackend=null,this.workspaceStorageBackendPromise=null,this.metadataLoaded=!1,this.metadataByPath=new Map,this.auditLoaded=!1,this.auditEntries=[],this.scratchCleanupByBackend=new WeakMap,e.initialBackend&&(this.backend=e.initialBackend,e.initialBackend.kind!==`native-directory`&&(this.workspaceStorageBackend=e.initialBackend)),e.initialWorkspaceBackend&&(this.workspaceStorageBackend=e.initialWorkspaceBackend)}async initializeBackend(){let e=await mt();return e&&await gt(e)===`granted`?(this.nativeHandle=e,new O(e)):typeof navigator<`u`&&navigator.storage&&typeof navigator.storage.getDirectory==`function`?new A:new j}initializeWorkspaceStorageBackend(){return typeof navigator<`u`&&navigator.storage&&typeof navigator.storage.getDirectory==`function`?Promise.resolve(new A):Promise.resolve(new j)}async getWorkspaceStorageBackend(e){if(this.workspaceStorageBackend)return await this.ensureScratchCleanupAttempted(this.workspaceStorageBackend),this.workspaceStorageBackend;let t=e??await this.getBackend();if(t.kind!==`native-directory`)return this.workspaceStorageBackend=t,await this.ensureScratchCleanupAttempted(t),t;this.workspaceStorageBackendPromise||=this.initializeWorkspaceStorageBackend();let n=await this.workspaceStorageBackendPromise;return this.workspaceStorageBackendPromise=null,this.workspaceStorageBackend=n,await this.ensureScratchCleanupAttempted(n),n}async removeWorkbookTags(e){await this.ensureMetadataLoaded();let t=!1;for(let n of e)this.metadataByPath.delete(n)&&(t=!0);t&&await this.persistMetadata()}async cleanupExpiredScratchFiles(e){let t=Date.now()-wt,n=(await e.listFiles()).filter(e=>e.path.startsWith(Z)&&e.modifiedAt<t).map(e=>e.path);if(n.length===0)return;let r=[];for(let t of n)try{await e.deleteFile(t),r.push(t)}catch{}r.length!==0&&(await this.removeWorkbookTags(r),W({reason:`delete`}))}async ensureScratchCleanupAttempted(e){let t=this.scratchCleanupByBackend.get(e);t||(t=this.cleanupExpiredScratchFiles(e).catch(()=>{}),this.scratchCleanupByBackend.set(e,t)),await t}async getBackend(){if(this.backend)return await this.ensureScratchCleanupAttempted(this.backend),this.backend.kind!==`native-directory`&&!this.workspaceStorageBackend&&(this.workspaceStorageBackend=this.backend),this.backend;this.backendPromise||=this.initializeBackend();let e=await this.backendPromise;return this.backend=e,this.backendPromise=null,await this.ensureScratchCleanupAttempted(e),e.kind!==`native-directory`&&(this.workspaceStorageBackend=e),e}replaceBackend(e){this.backend=e,this.backendPromise=null,e.kind!==`native-directory`&&(this.workspaceStorageBackend=e,this.workspaceStorageBackendPromise=null),W({reason:`backend`})}async ensureMetadataLoaded(){if(this.metadataLoaded)return;this.metadataLoaded=!0;let e=await X();if(e)try{let t=lt(await e.get(R));this.metadataByPath.clear();for(let[e,n]of t)this.metadataByPath.set(e,n)}catch{this.metadataByPath.clear()}}async persistMetadata(){let e=await X();if(!e)return;let t={};for(let[e,n]of this.metadataByPath)t[e]=n;let n={version:1,byPath:t};try{await e.set(R,n)}catch{}}async ensureAuditLoaded(){if(this.auditLoaded)return;this.auditLoaded=!0;let e=await X();if(e)try{let t=await e.get(z);this.auditEntries=dt(t)}catch{this.auditEntries=[]}}async persistAuditTrail(){let e=await X();if(!e)return;let t={version:1,entries:this.auditEntries};try{await e.set(z,t)}catch{}}async resolveActiveWorkbookTag(){try{let e=await d();return e.workbookId?{workbookId:e.workbookId,workbookLabel:l(e),taggedAt:Date.now()}:null}catch{return null}}async setWorkbookTagForPath(e,t){await this.ensureMetadataLoaded();let n=await this.resolveActiveWorkbookTag()??t;n&&(this.metadataByPath.set(e,{workbookId:n.workbookId,workbookLabel:n.workbookLabel,taggedAt:Date.now()}),await this.persistMetadata())}async removeWorkbookTag(e){await this.ensureMetadataLoaded(),this.metadataByPath.delete(e)&&await this.persistMetadata()}async moveWorkbookTag(e,t){await this.ensureMetadataLoaded();let n=this.metadataByPath.get(e);this.metadataByPath.delete(e),await this.setWorkbookTagForPath(t,n),await this.persistMetadata()}async pruneStaleWorkbookTags(e){await this.ensureMetadataLoaded();let t=!1;for(let n of this.metadataByPath.keys())e.has(n)||(this.metadataByPath.delete(n),t=!0);t&&await this.persistMetadata()}async withWorkbookTags(e){return await this.ensureMetadataLoaded(),e.map(e=>{let t=this.metadataByPath.get(e.path);return t?{...e,workbookTag:t}:e})}async workspacePathExists(e,t){try{return await t.readFile(e),!0}catch(e){if(J(e))return!1;throw e}}async appendAuditEntry(e){await this.ensureAuditLoaded();let t=await this.resolveActiveWorkbookTag(),n={id:ft(),at:Date.now(),action:e.action,actor:e.context.actor,source:e.context.source,backend:e.backend,path:e.path,fromPath:e.fromPath,toPath:e.toPath,bytes:e.bytes,workbookId:t?.workbookId,workbookLabel:t?.workbookLabel};this.auditEntries=[n,...this.auditEntries].slice(0,B),await this.persistAuditTrail()}withLocationKind(e,t){return e.map(e=>({...e,locationKind:t}))}async resolveSourceBackends(){let e=await this.getBackend();return{activeBackend:e,workspaceBackend:await this.getWorkspaceStorageBackend(e),nativeBackend:e.kind===`native-directory`?e:null}}async resolveMutationTarget(e){let{activeBackend:t,workspaceBackend:n,nativeBackend:r}=await this.resolveSourceBackends();if(e.requestedLocationKind===`workspace`)return{backend:n,locationKind:`workspace`};if(e.requestedLocationKind===`native-directory`){if(!r)throw Error(`Connected folder is not available.`);return{backend:r,locationKind:`native-directory`}}if(e.requestedLocationKind===`builtin-doc`)throw Error(`Built-in docs are read-only.`);if(e.path){let t=await this.workspacePathExists(e.path,n),i=r?await this.workspacePathExists(e.path,r):!1;if(t&&i)throw Error(`File '${e.path}' exists in both uploaded files and the connected folder. Select the file from Files and run the action there.`);if(t)return{backend:n,locationKind:`workspace`};if(i&&r)return{backend:r,locationKind:`native-directory`}}return e.defaultToWorkspace?{backend:n,locationKind:`workspace`}:t.kind===`native-directory`?{backend:t,locationKind:`native-directory`}:{backend:t,locationKind:`workspace`}}async readRawFile(e){let{activeBackend:t,workspaceBackend:n,nativeBackend:r}=await this.resolveSourceBackends(),i=$e(e.path);if(e.requestedLocationKind===`workspace`)return{result:await n.readFile(e.path),locationKind:`workspace`,auditBackend:n.kind};if(e.requestedLocationKind===`native-directory`){if(!r)throw Error(`Connected folder is not available.`);return{result:await r.readFile(e.path),locationKind:`native-directory`,auditBackend:r.kind}}if(e.requestedLocationKind===`builtin-doc`){if(!i)throw Error(`File not found: ${e.path}`);return{result:i,locationKind:`builtin-doc`,auditBackend:t.kind}}try{return{result:await t.readFile(e.path),locationKind:t.kind===`native-directory`?`native-directory`:`workspace`,auditBackend:t.kind}}catch(r){if(!J(r))throw r;if(t!==n)try{return{result:await n.readFile(e.path),locationKind:`workspace`,auditBackend:n.kind}}catch(e){if(!J(e))throw e}if(i)return{result:i,locationKind:`builtin-doc`,auditBackend:t.kind};throw r}}isNativeDirectoryPickerSupported(){return typeof window>`u`?!1:H(window)}async connectNativeDirectory(e={}){if(typeof window>`u`||!H(window))throw Error(`Native directory picker is not supported in this environment.`);let t=await window.showDirectoryPicker();if(await _t(t)!==`granted`)throw Error(`Permission to the selected folder was not granted.`);let n=await this.getBackend();n.kind!==`native-directory`&&(this.workspaceStorageBackend=n,this.workspaceStorageBackendPromise=null),this.nativeHandle=t,await ht(t),this.replaceBackend(new O(t)),await this.appendAuditEntry({action:`connect_native`,backend:`native-directory`,context:e.audit??V})}async disconnectNativeDirectory(e={}){this.nativeHandle=null,await ht(null);let t=await this.getWorkspaceStorageBackend();this.replaceBackend(t),await this.appendAuditEntry({action:`disconnect_native`,backend:t.kind,context:e.audit??V})}async getBackendStatus(){let e=await this.getBackend(),t=this.isNativeDirectoryPickerSupported();return{kind:e.kind,label:vt(e.kind),nativeSupported:t,nativeConnected:e.kind===`native-directory`,nativeDirectoryName:this.nativeHandle?.name}}async listFiles(e={}){let{activeBackend:t,workspaceBackend:n,nativeBackend:r}=await this.resolveSourceBackends(),i=await n.listFiles(),a=await this.withWorkbookTags(i),o=this.withLocationKind(a,`workspace`),s=new Set(a.map(e=>e.path));await this.pruneStaleWorkbookTags(s);let c=r?this.withLocationKind(await r.listFiles(),`native-directory`):[],l=new Set([...o.map(e=>e.path),...c.map(e=>e.path)]),u=this.withLocationKind(Qe(),`builtin-doc`).filter(e=>!l.has(e.path)),ee=$([...o,...c,...u]);return e.audit&&(await this.appendAuditEntry({action:`list`,backend:t.kind,context:e.audit}),W({reason:`audit`})),ee}async getSnapshot(){let[e,t]=await Promise.all([this.getBackendStatus(),this.listFiles()]);return{backend:e,files:t,signature:t.map(e=>{let t=e.workbookTag?.workbookId??``;return`${e.path}:${e.size}:${e.modifiedAt}:${t}`}).join(`|`)}}async readFile(e,t={}){let n=b(e),r=await this.readRawFile({path:n,requestedLocationKind:t.locationKind}),i=(r.locationKind===`workspace`&&r.result.sourceKind===`workspace`?await this.withWorkbookTags([r.result]):[r.result])[0],a=i?{...r.result,workbookTag:i.workbookTag,locationKind:r.locationKind}:{...r.result,locationKind:r.locationKind},o=t.mode??`auto`,s=t.maxChars??2e4,c;if(o===`text`){if(a.text===void 0)throw Error(`File '${n}' is binary (${a.mimeType}). Read it with mode=\"base64\" instead.`);let e=re(a.text,s);c={...a,text:e.text,base64:void 0,truncated:e.truncated}}else if(o===`base64`){let e=g(a.base64??m(f(a.text??``)),s);c={...a,text:void 0,base64:e.base64,truncated:e.truncated}}else if(a.text!==void 0){let e=re(a.text,s);c={...a,text:e.text,base64:void 0,truncated:e.truncated}}else{let e=g(a.base64??``,s);c={...a,text:void 0,base64:e.base64,truncated:e.truncated}}return t.audit&&(await this.appendAuditEntry({action:`read`,backend:r.auditBackend,context:t.audit,path:n,bytes:c.size}),W({reason:`audit`})),c}async writeTextFile(e,t,n,r={}){let i=b(e),a=await this.resolveMutationTarget({requestedLocationKind:r.locationKind,defaultToWorkspace:!1,path:i});if(P(i)&&!await this.workspacePathExists(i,a.backend))throw Error(`'${i}' is a built-in doc and cannot be modified.`);let o=f(t);await a.backend.writeBytes(i,o,n??_(S(i),`text/plain`)),a.locationKind===`workspace`&&await this.setWorkbookTagForPath(i),await this.appendAuditEntry({action:`write`,backend:a.backend.kind,context:r.audit??V,path:i,bytes:o.byteLength}),W({reason:`write`})}async writeBase64File(e,t,n,r={}){let i=b(e),a=await this.resolveMutationTarget({requestedLocationKind:r.locationKind,defaultToWorkspace:!1,path:i});if(P(i)&&!await this.workspacePathExists(i,a.backend))throw Error(`'${i}' is a built-in doc and cannot be modified.`);let o=h(t);await a.backend.writeBytes(i,o,n??_(S(i))),a.locationKind===`workspace`&&await this.setWorkbookTagForPath(i),await this.appendAuditEntry({action:`write`,backend:a.backend.kind,context:r.audit??V,path:i,bytes:o.byteLength}),W({reason:`write`})}async deleteFile(e,t={}){let n=b(e),r=await this.resolveMutationTarget({requestedLocationKind:t.locationKind,defaultToWorkspace:!1,path:n});if(P(n)&&!await this.workspacePathExists(n,r.backend))throw Error(`'${n}' is a built-in doc and cannot be deleted.`);await r.backend.deleteFile(n),r.locationKind===`workspace`&&await this.removeWorkbookTag(n),await this.appendAuditEntry({action:`delete`,backend:r.backend.kind,context:t.audit??V,path:n}),W({reason:`delete`})}async renameFile(e,t,n={}){let r=b(e),i=b(t),a=await this.resolveMutationTarget({requestedLocationKind:n.locationKind,defaultToWorkspace:!1,path:r});if(P(r)&&!await this.workspacePathExists(r,a.backend))throw Error(`'${r}' is a built-in doc and cannot be renamed.`);if(P(i))throw Error(`'${i}' is reserved for a built-in doc.`);await a.backend.renameFile(r,i),a.locationKind===`workspace`&&await this.moveWorkbookTag(r,i),await this.appendAuditEntry({action:`rename`,backend:a.backend.kind,context:n.audit??V,fromPath:r,toPath:i}),W({reason:`rename`})}async importFiles(e,t={}){let n=await this.resolveMutationTarget({requestedLocationKind:t.locationKind,defaultToWorkspace:!0}),r=0,i=0;for(let t of e){let e=typeof t.webkitRelativePath==`string`?t.webkitRelativePath.trim():``,a=b(e.length>0?e:t.name);if(P(a)&&!await this.workspacePathExists(a,n.backend))throw Error(`'${a}' is reserved for a built-in doc.`);let o=new Uint8Array(await t.arrayBuffer());await n.backend.writeBytes(a,o,_(t.name,t.type)),n.locationKind===`workspace`&&await this.setWorkbookTagForPath(a),r+=1,i+=o.byteLength}return r>0&&(await this.appendAuditEntry({action:`import`,backend:n.backend.kind,context:t.audit??V,bytes:i}),W({reason:`import`})),r}async listAuditEntries(e=40){await this.ensureAuditLoaded();let t=Math.max(0,Math.min(e,B));return this.auditEntries.slice(0,t)}async clearAuditTrail(e={}){await this.ensureAuditLoaded(),this.auditEntries=[],await this.persistAuditTrail(),W({reason:`audit`})}async downloadFile(e,t={}){if(typeof document>`u`)throw Error(`Downloads are not available in this environment.`);let n=window.open(``,`_blank`);try{let r=b(e),i=(await this.readRawFile({path:r,requestedLocationKind:t.locationKind})).result,a=i.base64?h(i.base64):f(i.text??``),o=F(i.mimeType&&v(i.mimeType)?i.mimeType:_(i.name,i.mimeType)),s=new Blob([rt(a)],{type:o}),c=URL.createObjectURL(s);if(!it(c,n)){let e=document.createElement(`a`);e.href=c,e.download=i.name,e.rel=`noopener`,e.style.display=`none`,document.body.appendChild(e),e.click(),e.remove()}setTimeout(()=>URL.revokeObjectURL(c),6e4)}catch(e){throw G(n),e}}async getContextSummary(e){return Ot({snapshot:await this.getSnapshot(),currentWorkbookId:e})}},At=null;function jt(){return At||=new kt,At}export{b as a,m as c,F as i,l,tt as n,ce as o,I as r,h as s,jt as t,d as u};