# 更新日志

本项目的所有重要变更都会记录在此文件。

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本 2.0.0](https://semver.org/lang/zh-CN/) 规范。

每个版本的 GitHub Release 链接：
- [v1.0.0](https://github.com/bingjian999/uih-ExcelV1/releases/tag/v1.0.0) - 2026-06-21

---

## [1.0.1] - 2026-06-25 (hotfix)

### 修复（Fixed）

- **关键 Bug：taskpane 空白页**：Vite 打包后 `taskpane.html` 引用的资源路径写成 `/assets/v6/*.js`，但实际文件位于 `/assets/*.js`（无 `v6/` 子目录）。导致 ES module 404、bundle 永远不执行、加载项一直停在 loading 状态
  - 受影响文件：`dist/src/taskpane.html` (12 处资源引用)
  - 修复方法：批量替换 `/assets/v6/` → `/assets/`
  - 影响范围：所有通过本地 HTTPS 模式（`https://localhost:3000`）加载 taskpane 的环境
  - 验证：在浏览器打开 `https://localhost:3000/src/taskpane.html` 不再空白；F12 Console 不再报 404

### 构建（Built）

- **重新打包 EXE**：基于 v1.0.0 EXE 基底，使用 postject `--overwrite` 重新注入修复后的 sea-prep.blob
  - EXE 大小：86,795,776 bytes (~82.8 MB)
  - 内嵌 dist.blob：52 个文件，1,487,877 bytes (gzip)
  - dist.version：`v1.0.1`
  - 下载地址：[UIH_AI_Base_PI-v1.0.1.exe](https://github.com/bingjian999/uih-ExcelV1/releases/download/v1.0.1/UIH_AI_Base_PI-v1.0.1.exe)

### 部署说明

- **旧用户**（已在 v1.0.0）：
  - 方式一（推荐）：下载新 EXE 直接替换旧 EXE，首次启动会自动覆盖 dist 目录
  - 方式二（快速修复）：仅下载 `dist/src/taskpane.html`，覆盖 `C:\Users\bingjian.wang\AppData\Local\UIH_AI_Base_PI\dist\src\taskpane.html`
- **新用户**：直接使用 `UIH_AI_Base_PI-v1.0.1.exe`，首次启动自动解压正确的 dist

### 验证

- EXE 启动成功：显示"联影AI_Base_PI — 本地启动器"，HTTPS 服务器在端口 3000 运行
- 提取的 taskpane.html 中 `/assets/v6/` 引用数为 0（已修复）
- 浏览器直接访问 `https://localhost:3000/src/taskpane.html` 看到完整 UI
- Excel 加载项面板内点击"联影AI"按钮不再空白

---

## [1.0.0] - 2026-06-21

### 新增（Added）

- **单文件 EXE 部署**：基于 Node.js 22 SEA + postject 注入，单文件 ~83 MB
- **多模型 AI 接入**：支持 OpenAI / Anthropic / Google / OpenRouter / 自定义网关 / 本地 Ollama
- **16 个内置 Excel 工具**：单元格读写、公式解释、Python 执行、扩展管理、备份恢复等
- **20+ 斜杠命令**：斜杠驱动的会话式操作
- **多会话 / 多标签页**：工作簿级会话持久化与恢复
- **扩展机制**：受沙箱权限控制的小程序加载
- **Python / tmux 桥接**：可在 Excel 任务窗格里直接跑本地 Python
- **Agent Skills**：可加载文件系统 / 扩展目录下的 Skills
- **零配置 Office 信任**：自动完成共享目录、注册表、自签证书三件套
- **MOTW 自动清理**：绕过 SmartScreen 的"未知发布者"拦截
- **5 种证书自动生成策略**：mkcert / openssl / Node.js / PowerShell / 内置证书
- **UIH 品牌化**：图标、Group、按钮、DisplayName 全部从 pi-for-excel 替换为 UIH_AI
- **完整中文文档**：用户手册、章节 7 详解、开发总结 3 份 HTML

### 安全（Security）

- 自签证书自动导入 `Cert:\LocalMachine\Root`
- Excel 加载项清单自动签名
- 嵌入资源（dist.blob）SHA-256 校验

### 已知限制（Known Limitations）

- 仅支持 Windows 10/11 x64
- 卸载时需手动执行清理脚本（开发中）
- 不支持 macOS / Linux（需替换 SEA 流程）
- 不支持多用户同时在同一台机器使用不同模型配置

### 致谢

- 基于 [pi-for-excel](https://github.com/tmustier/pi-for-excel) v0.9.5-pre
- 感谢联影内部测试团队的反馈
