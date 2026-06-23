# 更新日志

本项目的所有重要变更都会记录在此文件。

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本 2.0.0](https://semver.org/lang/zh-CN/) 规范。

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
