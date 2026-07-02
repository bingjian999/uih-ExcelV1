# UIH-Excel-V1 修改归档

## 版本历史

### v1.2.2 (2026-07-02)
- 替换所有用户可见的 `pi-for-excel-proxy` → `uih-excel-proxy`
- 替换 `pi-for-excel-python-bridge` → `uih-excel-python-bridge`
- 替换 `pi-for-excel-tmux-bridge` → `uih-excel-tmux-bridge`

### v1.2.1 (2026-07-02)
- 替换空状态 logo `π` → `UIH`
- 修复 package.json BOM 头导致 Vite 构建失败

### v1.2.0 (2026-07-02)
- 全面中文化：27 个文件，500+ 处英文 UI 文本
- 所有 "Pi" 引用替换为 "联影AI"

### v1.1.3 (2026-07-01)
- 修复构建流程：完整执行 Vite build + uih:build:blob + SEA + postject
- 验证中文和思考级别修复进入构建产物

### v1.1.0-v1.1.2 (2026-07-01)
- 思考级别修复：移除 model.reasoning 检查
- 修复 spawn 未定义导致闪退
- 代理横幅、设置页等中文化

### v1.0.7 (2026-06-30)
- 证书自动安装到 Windows 受信任根证书存储
- CORS 代理内置

---

## 修改文件清单

### 1. 品牌替换 (Pi → 联影AI / UIH)

| 文件 | 修改内容 |
|------|---------|
| `src/ui/pi-sidebar.ts` | π logo → UIH；侧边栏菜单中文化；标签页右键菜单中文化；上下文胶囊中文化；空状态标语中文化 |
| `src/ui/proxy-banner.ts` | 代理横幅中文化；`pi-for-excel-proxy` → `uih-excel-proxy` |
| `src/ui/provider-login.ts` | 服务商登录页中文化；`pi-for-excel-proxy` → `uih-excel-proxy` |
| `src/ui/web-search-setup-card.ts` | 网页搜索设置中文化；`pi-for-excel-proxy` → `uih-excel-proxy` |
| `src/ui/bridge-setup-card.ts` | 桥接设置中文化；`pi-for-excel-*-bridge` → `uih-excel-*-bridge` |
| `src/ui/disclosure-bar.ts` | 披露栏中文化 |
| `src/ui/pi-input.ts` | 输入框占位符中文化 |
| `src/ui/loading.ts` | 加载文本中文化 |
| `src/ui/files-dialog.ts` | 文件对话框全面中文化 |
| `src/ui/files-dialog-filtering.ts` | 文件筛选标签和分区标题中文化 |
| `src/taskpane/welcome-login.ts` | 欢迎页中文化；logo π → U |
| `src/taskpane/status-bar.ts` | 状态栏中文化；思考级别标签中文化 |
| `src/taskpane/status-popovers.ts` | 思考级别弹窗中文化 |
| `src/taskpane/init.ts` | 初始化消息中文化；快捷操作按钮中文化 |
| `src/taskpane/action-queue.ts` | 动作队列中文化 |
| `src/taskpane/keyboard-shortcuts.ts` | 思考级别修复（移除 model.reasoning 检查） |
| `src/taskpane/keyboard-shortcuts/editor-actions.ts` | 编辑器操作提示中文化 |

### 2. 命令和设置中文化

| 文件 | 修改内容 |
|------|---------|
| `src/commands/builtins/settings-overlay.ts` | 设置页全面中文化 |
| `src/commands/builtins/settings.ts` | 设置命令中文化 |
| `src/commands/builtins/shortcuts-overlay.ts` | 键盘快捷键弹窗中文化 |
| `src/commands/builtins/recovery-overlay.ts` | 备份弹窗全面中文化 |
| `src/commands/builtins/resume-overlay.ts` | 恢复会话弹窗中文化 |
| `src/commands/builtins/rules-overlay.ts` | 规则编辑器中文化 |
| `src/commands/builtins/extensions-hub-overlay.ts` | 扩展页中文化 |
| `src/commands/builtins/extensions-hub-connections.ts` | 连接管理中文化；桥接命令替换 |
| `src/commands/builtins/extensions-hub-plugins.ts` | 插件管理中文化 |
| `src/commands/builtins/extensions-hub-skills.ts` | 技能管理中文化 |
| `src/commands/builtins/extensions-hub-extension-connections.ts` | 扩展连接中文化 |
| `src/commands/builtins/experimental-overlay.ts` | 实验性功能弹窗中文化 |
| `src/commands/builtins/experimental.ts` | 实验性命令中文化 |
| `src/commands/builtins/custom-gateway-settings.ts` | 自定义网关设置中文化 |
| `src/commands/builtins/session.ts` | 会话命令中文化 |
| `src/commands/builtins/export.ts` | 导出命令中文化 |
| `src/commands/builtins/debug.ts` | 调试命令中文化 |
| `src/commands/builtins/clipboard.ts` | 剪贴板命令中文化 |
| `src/commands/builtins/model.ts` | 模型命令中文化 |

### 3. 认证和工具

| 文件 | 修改内容 |
|------|---------|
| `src/auth/anthropic-browser-oauth.ts` | OAuth 登录页中文化 |
| `src/auth/google-browser-oauth-core.ts` | OAuth 登录页中文化 |
| `src/auth/openai-codex-browser-oauth.ts` | OAuth 登录页中文化 |
| `src/tools/external-fetch.ts` | 代理命令 `pi-for-excel-proxy` → `uih-excel-proxy` |

### 4. 服务器和配置

| 文件 | 修改内容 |
|------|---------|
| `src/_uih/pi-server.cjs` | 服务器日志中文化；spawn 修复（防止闪退）；心跳日志 |
| `src/taskpane.html` | HTML 标题中文化 |
| `package.json` | 版本号更新；BOM 修复 |
| `dist.version` | 版本号更新 |
| `release/UIH_AI_Base_PI-Debug.bat` | Debug 脚本版本号更新 |

---

## 构建流程

完整构建命令序列：
```bash
npm run build              # Vite 构建 → dist/
npm run uih:build:blob     # 打包 dist/ → build/dist.blob
cp build/dist.blob dist.blob  # 复制到根目录
node --experimental-sea-config sea-config.json  # 生成 SEA blob
cp release/UIH_AI_Base_PI-v1.0.0.exe release/UIH_AI_Base_PI-v<VERSION>.exe
npx postject release/UIH_AI_Base_PI-v<VERSION>.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 --overwrite
```

## 未修改的功能性标识符（保持不变）

- `src/app/metadata.ts` — `APP_NAME = "pi-for-excel"` (内部标识符)
- `src/storage/init-app-storage.ts` — 数据库名 `"pi-for-excel"` (IndexedDB 名称)
- `src/auth/proxy-validation.ts` — GitHub URL 链接
- `src/manifest.xml` / `src/_uih/manifest.xml` — SupportUrl
- `src/_uih/pi-server.cjs` / `src/pi-server.cjs` — `PI_DATA_DIR` 环境变量、`.pi-for-excel` 目录路径、注释
- localStorage key `pi.onboarding.disclosure.acknowledged` — 已存用户的确认状态
