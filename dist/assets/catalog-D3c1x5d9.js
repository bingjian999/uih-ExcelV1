import{n as e}from"./chunk-aKtaBQYM.js";import{t}from"./test-raw-markdown-glob-CjJeF-vm.js";import{t as n}from"./frontmatter-DIyhtxKW.js";var r=`---
name: extending-pi
description: Plan and build 联影AI_Base_PI extensions safely: choose skill vs extension plugin vs connection, create flat SKILL.md skills, and handle API keys without asking users to 粘贴 secrets in chat.
compatibility: 联影AI_Base_PI runtime. Plugin = runtime extension module. Assumes access to extensions_manager and skills tools.
metadata:
  docs: docs/extensions.md
  related: docs/agent-skills-interop.md
---

# Extending Pi (联影AI_Base_PI)

Use this skill when the user asks to extend Pi, add capabilities, or integrate an external API/tool.

## Default behavior (non-negotiable)

- Prefer solutions the assistant can set up and run itself.
- Never ask users to 粘贴 API keys/tokens/passwords in chat.
- Never create \`/set-key ...\` style commands that take secrets from the prompt input.
- Prefer first-class connection setup UX (\`/tools\` → Connections) for secret entry.
- For API-backed plugin implementation/testing, proactively recommend local bridge setup:
  - **Preferred:** Python bridge (best for API prototyping, payload transforms, quick debugging scripts).
  - **Fallback:** tmux bridge (assistant can still run \`curl\`, Node scripts, and CLI checks).
  - If neither is available, still scaffold the extension, but explicitly note reduced verification and offer setup help.

When recommending bridge setup, read the relevant setup skill before giving commands:
- \`python-bridge\`
- \`tmux-bridge\`

## 1) Choose the right extension surface

| Goal | Build | Why |
|---|---|---|
| Teach Pi a workflow, process, or decision rubric | **Skill** | Lowest maintenance; mostly instruction logic |
| Add runtime behavior (slash command, tool, widget, event handling, storage/http) | **Extension plugin** | Requires executable code |
| Add secure credential/config setup for extension tools | **Extension connection** | First-class setup/status/preflight/error guidance |
| Save one-off user/workbook preferences | **instructions** tool | Not an extension |

Heuristic: if instructions + existing tools are enough, build a **skill** first.

---

## 2) Skill authoring (adapted from \`skill-creator\`, flat profile)

For this repo, default to **flat skills**: one \`skills/<name>/SKILL.md\` file.
Only add extra folders if clearly needed.

### Core principles

- **Conciseness:** only include domain-specific guidance the model cannot infer reliably.
- **Activation quality:** trigger matching comes from frontmatter \`description\`; make it precise.
- **Context over directives:** explain why an approach works, not just rigid commands.
- **Progressive disclosure (lightweight):** keep SKILL.md focused; avoid dumping long reference text.

### Required format and naming

- Required frontmatter: \`name\`, \`description\`
- Directory name must equal \`name\`
- Name rules:
  - 1-64 chars
  - lowercase letters, digits, hyphens
  - no leading/trailing/consecutive hyphens

### Workflow

1. Capture 2-4 concrete user prompts the skill should handle.
2. Create \`skills/<name>/SKILL.md\`.
3. Write frontmatter:

\`\`\`yaml
---
name: my-skill
description: What it does + when to use it.
compatibility: Optional constraints.
---
\`\`\`

4. Write body with:
   - purpose and boundaries
   - mapping to relevant tools/integrations
   - step-by-step workflow
   - guardrails/pitfalls
5. Install/update via \`skills\` tool (\`install\`/\`uninstall\`) when available; otherwise use \`/extensions\` → Skills.
6. Validate with \`skills\` tool:
   - \`action="list"\`
   - \`action="read"\` for the new skill.

---

## 3) Extension plugin workflow

Use when the user needs new executable behavior.

1. Build a single-file ES module with \`activate(api)\`.
2. Register only required surfaces (\`registerCommand\`, \`registerTool\`, widget, etc.).
3. Keep capabilities least-privilege.
4. Install from chat using \`extensions_manager\` (\`install_code\`, \`set_enabled\`, \`reload\`, \`uninstall\`).
5. Validate by invoking the new command/tool end-to-end.

Minimal skeleton:

\`\`\`ts
export function activate(api) {
  api.registerCommand("hello_ext", {
    description: "Example command",
    handler: () => api.toast("Hello from extension"),
  });

  return () => {
    api.widget.dismiss();
    api.overlay.dismiss();
  };
}
\`\`\`

---

## 4) API keys/secrets: secure-by-default pattern

### Tier 1 (default): host-injected auth via \`http.fetch(..., { connection })\`

For API-backed extension tools:

1. Register a connection in \`activate(api)\`.
2. Add \`httpAuth\` on the connection definition with a strict \`allowedHosts\` list.
3. Mark tools with \`requiresConnection\`.
4. Direct user to \`/tools\` → Connections for secret entry.
5. Call \`api.http.fetch(url, { connection: "<id>" })\`.

Connection registration template:

\`\`\`ts
api.connections.register({
  id: "acme",
  title: "Acme API",
  capability: "query Acme records",
  authKind: "api_key",
  secretFields: [{ id: "apiKey", label: "API key", required: true, maskInUi: true }],
  httpAuth: {
    placement: "header",
    headerName: "Authorization",
    valueTemplate: "Bearer {apiKey}",
    allowedHosts: ["api.acme.com"],
  },
  setupHint: "Open /tools → Connections → Extension connections",
});
\`\`\`

Tool call template:

\`\`\`ts
const response = await api.http.fetch("https://api.acme.com/v1/search?q=...", {
  method: "GET",
  connection: "acme",
});
\`\`\`

### Tier 2 (escape hatch): \`connections.getSecrets\`

Only when Tier 1 cannot support the integration (SDK bootstrap, custom request signing, etc.):

\`\`\`ts
const secrets = await api.connections.getSecrets("acme");
\`\`\`

Guardrails:
- Requires \`connections.secrets.read\` capability.
- Never echo/log secrets.
- Still keep user secret entry in \`/tools\` → Connections.

### Forbidden patterns

- \`/set-key ...\` slash commands
- "Paste your API key in chat"
- Logging/echoing secrets in tool output/errors

---

## 5) Standard reusable “secure connection bundle”

When generating API-backed extension code, use \`docs/extensions-secure-connection-bundle.md\` as the default scaffold.

Default scaffold requirements:
- connection definition + \`httpAuth\`
- strict \`allowedHosts\`
- tool \`requiresConnection\`
- host-injected auth path first
- no-chat-secret policy in comments/docs

## References

- \`docs/extensions.md\`
- \`docs/extensions-secure-connection-bundle.md\`
- \`docs/agent-skills-interop.md\`
- skill: \`skill-creator\`
`,i=`---
name: mcp-gateway
description: Discover and call tools from configured MCP servers. Use when external capabilities are needed beyond built-in workbook tools.
compatibility: Requires 联影AI_Base_PI integration "mcp_tools" to be enabled and at least one MCP server configured.
metadata:
  integration-id: mcp_tools
  tool-name: mcp
  docs: docs/agent-skills-interop.md
---

# MCP Gateway

This repository exposes MCP access as a built-in **integration** in the Excel add-in.

## Mapping

- Agent Skill name: \`mcp-gateway\`
- Excel integration ID: \`mcp_tools\`
- Tool name: \`mcp\`

## Usage notes

- Prefer listing/describing tools before invocation.
- Clearly report which server and tool were used.
- Treat MCP servers as external, potentially high-impact systems.

## Excel-specific setup

1. Open \`/tools\` (or \`/extensions\` → Connections tab).
2. Enable external tools.
3. Add one or more MCP servers.
4. Enable **MCP Gateway** for session and/or workbook scope.
`,a=`---
name: python-bridge
description: Native Python execution via the local Python bridge. Use when the user asks about running Python locally, setting up the Python bridge, LibreOffice conversion, or troubleshooting Python connectivity.
compatibility: Python tools always work via in-browser Pyodide. The native bridge is optional and requires a local bridge process running on the user's machine.
metadata:
  tool-name: python_run
  docs: docs/python-bridge-contract.md
---

# Python Bridge

The Python bridge 使联影AI 可以访问原生 Python on the user's machine. It is an opt-in capability that upgrades the default in-browser Pyodide runtime.

## Pyodide (default) vs Native bridge

| | Pyodide (default) | Native bridge |
|---|---|---|
| Setup | None — works out of the box | Requires local bridge process |
| Packages | Pure-Python only (numpy, pandas, scipy via micropip) | Full ecosystem (C extensions, ML libs, etc.) |
| Filesystem | No local filesystem access | Full local filesystem |
| LibreOffice | Not available | Available (\`libreoffice_convert\` tool) |
| Long scripts | WebAssembly limits | No limits |

**Prefer Pyodide unless the task requires native-only capabilities.**

## How to set it up

### 1. Start the bridge

\`\`\`bash
npx pi-for-excel-python-bridge
\`\`\`

This defaults to **real execution mode** on \`https://localhost:3340\`.

Options:
- \`--install-missing\` — auto-install Python/LibreOffice via Homebrew (macOS)
- \`PYTHON_BRIDGE_MODE=stub\` — safe simulated mode
- \`PYTHON_BRIDGE_TOKEN=your-secret\` — require auth token
- \`PYTHON_BRIDGE_PYTHON_BIN=python3.12\` — specify Python binary

Requirements:
- \`python3\` must be on \`PATH\` (or set \`PYTHON_BRIDGE_PYTHON_BIN\`)
- LibreOffice (\`soffice\`) is optional — only needed for \`libreoffice_convert\`

### 2. 在联影AI 中配置（可选）

The default URL (\`https://localhost:3340\`) works automatically. Override if needed:

\`\`\`
/experimental python-bridge-url <url>
/experimental python-bridge-token <token>
\`\`\`

Or use: \`/extensions\` → **Connections** → **Python bridge**

### 3. First execution

The first time Python runs through the native bridge, 联影AI 将要求明确的用户确认 (one-time per bridge URL).

## Tools

- **python_run** — execute a Python snippet, inspect stdout/stderr/result
- **python_transform_range** — read Excel range → run Python → write result back (single tool call)
- **libreoffice_convert** — convert files between formats (xlsx ↔ csv ↔ pdf) — bridge-only

## When the bridge is not running

\`python_run\` and \`python_transform_range\` fall back to Pyodide automatically. Only \`libreoffice_convert\` strictly requires the bridge.

## Security

- Loopback-only (localhost)
- Origin allowlist
- Optional bearer token auth
- Python runs with \`-I\` isolation flag
- Code/input/output size limits
- Timeout enforcement

## Troubleshooting

- **Falls back to Pyodide unexpectedly** — the bridge process isn't running. Start it with \`npx pi-for-excel-python-bridge\`.
- **Import errors on Pyodide** — the package likely has C extensions. Set up the native bridge.
- **LibreOffice convert fails** — ensure \`soffice\` is on PATH. Install with \`brew install --cask libreoffice\` (macOS).
- **CORS/cert errors** — visit \`https://localhost:3340\` in your browser and accept the certificate.
`,o=`---
name: tmux-bridge
description: Local terminal access via the tmux bridge. Use when the user asks about running shell commands, setting up the tmux bridge, or troubleshooting terminal connectivity.
compatibility: Requires a local tmux bridge process running on the user's machine.
metadata:
  tool-name: tmux
  docs: docs/tmux-bridge-contract.md
---

# Tmux Bridge

The tmux bridge 使联影AI 可以访问真实的本地终端 on the user's machine. The \`tmux\` tool is always registered — it just needs the bridge process running locally to work.

## What it does

When the bridge is running, the \`tmux\` tool can:
- **list_sessions** — see active tmux sessions
- **create_session** — start a new shell session (optionally in a specific directory)
- **send_keys** — type commands into a session
- **capture_pane** — read terminal output
- **send_and_capture** — send a command and wait for output in one call
- **kill_session** — close a session

## Running \`pi\` (or other local CLIs) via tmux

The tmux pane is a normal local shell. If \`pi\` is installed, you can invoke it directly with \`send_keys\`/\`send_and_capture\` text like any other command.

Recommended flow:
1. \`list_sessions\` then \`create_session\` (or reuse an existing session)
2. Optional one-time check: \`command -v pi\`
3. Send the \`pi ...\` command
4. Monitor output with \`capture_pane\`

For long-running jobs, avoid rapid repeated captures. Prefer:
- \`capture_pane\` with \`wait_ms\` (for example 15000-30000), or
- \`send_and_capture\` with \`wait_for\` + \`timeout_ms\` when you know a completion pattern.

## How to set it up

### 1. Start the bridge

The bridge is a local HTTPS server. Run it from a terminal:

\`\`\`bash
npx pi-for-excel-tmux-bridge
\`\`\`

This defaults to **real tmux mode** on \`https://localhost:3341\`.

Options:
- \`--install-missing\` — auto-install tmux via Homebrew (macOS)
- \`TMUX_BRIDGE_MODE=stub\` — safe simulated mode (no real shell execution)
- \`TMUX_BRIDGE_TOKEN=your-secret\` — require auth token

### 2. 在联影AI 中配置（通常不需要）

The default bridge URL (\`https://localhost:3341\`) works automatically — no configuration required. If you need a custom URL or auth token:

\`\`\`
/experimental tmux-bridge-url <url>
/experimental tmux-bridge-token <token>
/experimental tmux-status
\`\`\`

### 3. Accept the local HTTPS certificate

The bridge uses a self-signed cert. You may need to visit \`https://localhost:3341\` in your browser once and accept it.

## When the bridge is not running

The \`tmux\` tool stays registered but returns an error if the bridge is unreachable. Python tools (\`python_run\`, \`python_transform_range\`) still work via the in-browser Pyodide fallback — tmux is the only tool that strictly requires its bridge.

## Security

- Loopback-only (localhost)
- Origin allowlist
- Optional bearer token auth
- Session names and key tokens are validated
- No shell interpolation (argv-based tmux calls)

## Troubleshooting

- **"bridge URL is unavailable"** — the bridge process isn't running. Start it with \`npx pi-for-excel-tmux-bridge\`.
- **"timed out"** — the bridge is running but the command took too long. Default timeout is 15s; use \`timeout_ms\` for longer operations.
- **CORS/cert errors** — visit the bridge URL directly in your browser and accept the certificate.
`,s=`---
name: web-search
description: Search the public web for up-to-date facts. Works out of the box with Jina (default, no API key needed); optionally Serper, Tavily, or Brave Search. Use when workbook context is insufficient and fresh external references are needed.
compatibility: Requires 联影AI_Base_PI integration "web_search" to be enabled. Works immediately with Jina (default); Serper/Tavily/Brave require an API key.
metadata:
  integration-id: web_search
  tool-name: web_search
  docs: docs/agent-skills-interop.md
---

# Web Search

This repository exposes web search as a built-in **integration** in the Excel add-in.

## Mapping

- Agent Skill name: \`web-search\`
- Excel integration ID: \`web_search\`
- Tools: \`web_search\`, \`fetch_page\`

## Providers

| Provider | API key | Notes |
|---|---|---|
| **Jina** (default) | Optional (for higher limits) | Works out of the box — no signup needed |
| Serper.dev | Required | Google SERP API, free tier available |
| Tavily | Required | AI-native search, free monthly credits |
| Brave Search | Required | Direct Brave Search API |

If a keyed provider fails (auth/rate-limit/server error), search automatically retries with Jina and surfaces a warning.

## Usage notes

- Prefer workbook data first.
- Use web search only when external facts are required.
- Cite sources from tool results (\`[1]\`, \`[2]\`, ...).

## Excel-specific setup

1. Open \`/tools\` (or \`/extensions\` → Connections tab).
2. Enable external tools.
3. Enable **Web Search** for session and/or workbook scope.
4. (Optional) Choose a different provider and set its API key — Jina works by default with no configuration.
`,c=e({buildAgentSkillPromptEntries:()=>b,getAgentSkillByName:()=>y,getAgentSkillPromptEntries:()=>x,listAgentSkills:()=>v,mergeAgentSkillDefinitions:()=>_});function l(e){let t=e.replaceAll(`\\`,`/`);if(t.startsWith(`./`))return t.slice(2);let n=t;for(;n.startsWith(`../`);)n=n.slice(3);return n}function u(e){if(!e.startsWith(`skills/`))return!1;let t=e.split(`/`);return t.length===3?t[2]===`SKILL.md`:!1}function d(){try{return Object.assign({"../../skills/extending-pi/SKILL.md":r,"../../skills/mcp-gateway/SKILL.md":i,"../../skills/python-bridge/SKILL.md":a,"../../skills/tmux-bridge/SKILL.md":o,"../../skills/web-search/SKILL.md":s})}catch{return t(`../../skills/*/SKILL.md`,import.meta.url)}}function f(){return Object.entries(d()).map(([e,t])=>({location:l(e),markdown:t})).filter(e=>u(e.location)).sort((e,t)=>e.location.localeCompare(t.location))}var p=f();function m(e){return{name:e.frontmatter.name,description:e.frontmatter.description,compatibility:e.frontmatter.compatibility,location:e.location,sourceKind:e.sourceKind,markdown:e.markdown,body:e.body}}function h(){let e=[];for(let t of p){let r=n(t.markdown);if(!r){console.warn(`[skills] Invalid SKILL.md frontmatter: ${t.location}`);continue}e.push(m({location:t.location,markdown:t.markdown,frontmatter:r.frontmatter,sourceKind:`bundled`,body:r.body}))}return e.sort((e,t)=>e.name.localeCompare(t.name)),e}var g=h();function _(e,t){let n=new Map;for(let t of e)n.set(t.name.toLowerCase(),t);for(let e of t){let t=e.name.toLowerCase();n.has(t)||n.set(t,e)}return Array.from(n.values()).sort((e,t)=>e.name.localeCompare(t.name))}function v(){return[...g]}function y(e){let t=e.trim().toLowerCase();return t.length===0?null:g.find(e=>e.name.toLowerCase()===t)??null}function b(e){return e.map(e=>({name:e.name,description:e.description,location:e.location}))}function x(){return b(g)}export{_ as i,c as n,v as r,b as t};