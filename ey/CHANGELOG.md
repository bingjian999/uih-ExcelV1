# EY-Excel-V1 修改归档

## 版本历史

### ey-v1.0.0 (2026-07-10) — 安永品牌版首发

基于 UIH-Excel v1.3.0 重新品牌化，所有"联影"替换为"安永"，"UIH"替换为"EY"，"Pi"替换为"EY AI"。

#### 品牌替换

| 原品牌 | 新品牌 | 替换数 |
|--------|--------|--------|
| 联影 / 联影AI | 安永 / 安永AI | 107+ 处 |
| UIH / UIH_AI_Base_PI | EY / EY_AI_Base | 88+ 处 |
| uih-excel-* | ey-excel-* | 10 处 |
| UIHGroup / OpenUIHButton / UIHTaskPane | EYGroup / OpenEYButton / EYTaskPane | 6 处 |
| "You are Pi" | "You are EY AI" | 1 处（系统提示词） |

#### 功能改进（继承自 UIH-Excel v1.3.0）

- **Pi 栈升级**：`@earendil-works/pi-ai` 和 `pi-agent-core` 从 0.79.1 → 0.80.3
- **compat 别名**：`vite.config.ts` 添加正则别名 `^@earendil-works/pi-ai$` → `/compat` 子路径
- **代理端口随机回退**：`pi-server.cjs` 和 `scripts/cors-proxy-server.mjs` 新增 EADDRINUSE → listen(0) 回退
- **inject-sea 脚本**：添加 `overwrite: true` 选项，支持重复注入

#### 证书信任增强（ey-v1.0.0 新增）

- **4 级证书安装回退**：PowerShell LocalMachine → PowerShell CurrentUser → certutil → certutil -f
- **PowerShell 执行策略**：添加 `-ExecutionPolicy Bypass` 参数
- **自动生成 install-cert.bat**：所有自动方法失败时生成手动安装脚本
- **证书未信任时跳过 Excel 自动启动**：避免用户看到"加载项错误"

#### 修改文件清单（40 个文件）

**品牌替换 — UI 组件（11 个文件）**

| 文件 | 修改内容 |
|------|---------|
| `src/ui/pi-sidebar.ts` | π logo → EY；侧边栏菜单中文化；标签页右键菜单；上下文胶囊；空状态标语 |
| `src/ui/proxy-banner.ts` | 代理横幅中文化；`pi-for-excel-proxy` → `ey-excel-proxy` |
| `src/ui/provider-login.ts` | 服务商登录页中文化；`pi-for-excel-proxy` → `ey-excel-proxy` |
| `src/ui/web-search-setup-card.ts` | 网页搜索设置中文化；`pi-for-excel-proxy` → `ey-excel-proxy` |
| `src/ui/bridge-setup-card.ts` | 桥接设置中文化；`pi-for-excel-*-bridge` → `ey-excel-*-bridge` |
| `src/ui/disclosure-bar.ts` | 披露栏中文化 |
| `src/ui/pi-input.ts` | 输入框占位符中文化 |
| `src/ui/files-dialog.ts` | 文件对话框全面中文化 |
| `src/ui/files-dialog-filtering.ts` | 文件筛选标签和分区标题中文化 |

**品牌替换 — Taskpane（5 个文件）**

| 文件 | 修改内容 |
|------|---------|
| `src/taskpane/welcome-login.ts` | 欢迎页中文化；logo π → EY |
| `src/taskpane/status-bar.ts` | 状态栏中文化；思考级别标签 |
| `src/taskpane/init.ts` | 初始化消息中文化；快捷操作按钮 |
| `src/taskpane/action-queue.ts` | 动作队列中文化 |
| `src/taskpane/keyboard-shortcuts/editor-actions.ts` | 编辑器操作提示中文化 |

**品牌替换 — 命令和设置（8 个文件）**

| 文件 | 修改内容 |
|------|---------|
| `src/commands/builtins/settings-overlay.ts` | 设置页全面中文化 |
| `src/commands/builtins/settings.ts` | 设置命令中文化 |
| `src/commands/builtins/recovery-overlay.ts` | 备份弹窗全面中文化 |
| `src/commands/builtins/rules-overlay.ts` | 规则编辑器中文化 |
| `src/commands/builtins/extensions-hub-connections.ts` | 连接管理中文化；桥接命令替换 |
| `src/commands/builtins/extensions-hub-plugins.ts` | 插件管理中文化 |
| `src/commands/builtins/extensions-hub-overlay.ts` | 扩展页中文化 |
| `src/commands/builtins/custom-gateway-settings.ts` | 自定义网关设置中文化 |

**品牌替换 — 认证和工具（4 个文件）**

| 文件 | 修改内容 |
|------|---------|
| `src/auth/anthropic-browser-oauth.ts` | OAuth 登录页中文化 |
| `src/auth/google-browser-oauth-core.ts` | OAuth 登录页中文化 |
| `src/auth/openai-codex-browser-oauth.ts` | OAuth 登录页中文化 |
| `src/tools/external-fetch.ts` | 代理命令 `pi-for-excel-proxy` → `ey-excel-proxy` |

**品牌替换 — 系统提示词（1 个文件）**

| 文件 | 修改内容 |
|------|---------|
| `src/prompt/system-prompt.ts` | AI 身份从 `You are Pi` → `You are EY AI` |

**品牌替换 — Manifest 清单（3 个文件）**

| 文件 | 修改内容 |
|------|---------|
| `manifest.xml` | 完全重写：ProviderName → 安永AI_Base；DisplayName → 安永AI_Base；Group/Control/Taskpane ID → EY* |
| `src/manifest.xml` | 同上标识符替换 |
| `src/_uih/manifest.xml` | 同上标识符替换 |

**服务器和配置（4 个文件）**

| 文件 | 修改内容 |
|------|---------|
| `pi-server.cjs` | 品牌替换；证书信任增强（4 级回退 + install-cert.bat 生成 + 未信任跳过 Excel） |
| `src/_uih/pi-server.cjs` | 品牌替换 |
| `src/pi-server.cjs` | 品牌替换 |
| `src/taskpane.html` | HTML 标题中文化 |

**Pi 栈升级（5 个文件）**

| 文件 | 修改内容 |
|------|---------|
| `src/auth/stream-proxy.ts` | 导入路径 `@earendil-works/pi-ai` → `@earendil-works/pi-ai/compat` |
| `src/extensions/runtime-manager-helpers.ts` | 同上 |
| `src/taskpane/default-model.ts` | 同上 |
| `src/taskpane/sessions.ts` | 同上 |
| `src/compat/bedrock-provider-stub.ts` | 同上 |

**代理端口回退（2 个文件）**

| 文件 | 修改内容 |
|------|---------|
| `pi-server.cjs` | EADDRINUSE → listen(0) 回退机制 |
| `scripts/cors-proxy-server.mjs` | 完整递归 listen() 回退逻辑 |

**构建工具（2 个文件）**

| 文件 | 修改内容 |
|------|---------|
| `vite.config.ts` | 添加 `^@earendil-works/pi-ai$` → compat 正则别名 |
| `scripts/_uih/inject-sea.cjs` | 添加 `overwrite: true` 选项 |

**文档和版本（6 个文件）**

| 文件 | 修改内容 |
|------|---------|
| `package.json` | name → ey-excel-tools；version → 1.0.0；Pi 栈 → 0.80.3 |
| `dist.version` | ey-v1.0.0 |
| `README.md` | 全文中文化；安永品牌；差异对比表更新 |
| `CHANGELOG.md` | 本文件 |
| `docs/CLIENT-TROUBLESHOOTING.md` | 品牌替换 |
| `docs/DEVELOPING.md` | 品牌替换 |

**工具脚本（1 个文件）**

| 文件 | 修改内容 |
|------|---------|
| `release/EY-Cleanup.bat` | Office 缓存清理工具 |

---

## 版本管理策略

### 双版本并行

| 维度 | UIH 版 | EY 版 |
|------|--------|-------|
| 版本号 | v1.3.0 | ey-v1.0.0 |
| 包名 | uih-excel-tools | ey-excel-tools |
| EXE 名 | UIH_AI_Base_PI-v1.3.0.exe | EY_AI_Base-v1.0.0.exe |
| GitHub Tag | v1.3.0 | ey-v1.0.0 |
| 日志目录 | `%LOCALAPPDATA%\UIH_AI_Base_PI\` | `%LOCALAPPDATA%\EY_AI_Base\` |
| 共享目录 | `UIH_Catalog$` | `EY_Catalog$` |
| Office 清单 | ProviderName: 联影AI_Base_PI | ProviderName: 安永AI_Base |

### GitHub Release 结构

- `v1.3.0` — UIH 版（联影品牌）
- `ey-v1.0.0` — EY 版（安永品牌）
- `ey/` 目录 — EY 版源码备份

---

## 构建流程

完整构建命令序列：
```bash
# 1. 清理缓存
rm -rf dist node_modules/.cache node_modules/.vite

# 2. Vite 构建
npm run build

# 3. 打包 dist/ → dist.blob
npm run uih:build:blob
cp build/dist.blob dist.blob

# 4. 生成 SEA blob
node --experimental-sea-config sea-config.json

# 5. 注入到基础 EXE
cp release/UIH_AI_Base_PI-v1.0.0.exe release/EY_AI_Base-v1.0.0.exe
node scripts/_uih/inject-sea.cjs release/EY_AI_Base-v1.0.0.exe sea-prep.blob
```

---

## 未修改的功能性标识符（保持不变）

- `src/app/metadata.ts` — `APP_NAME = "pi-for-excel"` (内部标识符)
- `src/storage/init-app-storage.ts` — 数据库名 `"pi-for-excel"` (IndexedDB 名称)
- localStorage key `pi.onboarding.disclosure.acknowledged` — 已存用户的确认状态
- npm 包名 `@earendil-works/pi-*` — 上游依赖包名
- `sea-config.json` — `main` 字段仍指向 `pi-server.cjs`
