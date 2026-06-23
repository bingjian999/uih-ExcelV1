# UIH Excel Tools (联影AI_Base_PI)

> 面向联影内部用户的本地化 Excel AI 助手，基于开源项目 [pi-for-excel](https://github.com/tmustier/pi-for-excel) 二次定制。
> 单文件 EXE 即可在 Windows 上提供"侧边栏 AI + 多模型接入 + Office 加载项零配置部署"能力。

[![Status](https://img.shields.io/badge/status-stable-brightgreen)](#)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](#)
[![Platform](https://img.shields.io/badge/platform-Windows%2010%2F11%20x64-blue)](#)
[![Runtime](https://img.shields.io/badge/runtime-Node.js%2022%20SEA-orange)](#)
[![License](https://img.shields.io/badge/license-MIT-yellow)](#LICENSE)

---

## 目录

- [项目简介](#项目简介)
- [核心特性](#核心特性)
- [快速开始](#快速开始)
- [架构概览](#架构概览)
- [目录结构](#目录结构)
- [构建与发布](#构建与发布)
- [使用文档](#使用文档)
- [常见问题](#常见问题)
- [路线图](#路线图)
- [许可证](#许可证)
- [致谢](#致谢)

---

## 项目简介

`联影AI_Base_PI`（品牌化名：**UIH_AI**）是一个打包成单个 EXE 的 Windows 本地 Excel 加载项服务。它把 [pi-for-excel](https://github.com/tmustier/pi-for-excel) 的全部前端能力（任务窗格、AI 对话、16 个内置工具、扩展机制、Python / tmux 桥接、Agent Skills）打包进 Node.js SEA 单文件中，并通过本地 HTTPS + 自签证书 + Office 信任目录三套机制让 Excel 直接识别加载项。

### 与上游 pi-for-excel 的差异

| 维度 | 上游 pi-for-excel | UIH Excel Tools (V1) |
| --- | --- | --- |
| 分发形态 | 需安装 Node + npm + dist/ | 单文件 EXE（~83 MB，SEA 打包） |
| 部署方式 | npm start / 开发服务器 | 双击 EXE → 桌面快捷方式 |
| 证书管理 | 用户自备 mkcert | 自动尝试 mkcert / openssl / Node.js / PowerShell / 内置证书 |
| Office 信任 | 手动配置共享目录 | 自动创建 `\\<host>\UIH_Catalog$` + 注册表 |
| MOTW 清理 | 无 | 启动时递归删除 Zone.Identifier |
| 品牌 | pi-for-excel | UIH_AI（图标、Group、按钮均已替换） |
| 文档 | 英文 | 全中文 + 详细章节拆分 |

---

## 核心特性

- **单文件 EXE**：Node.js 22 SEA 打包 + postject 注入，零外部依赖。
- **多模型 AI 接入**：支持 OpenAI / Anthropic / Google / OpenRouter / 自定义网关 / 本地 Ollama，已实现代理直连。
- **16 个内置 Excel 工具**：单元格读写、公式解释、Python 执行、扩展管理、备份恢复等。
- **20+ 斜杠命令**：斜杠驱动的会话式操作。
- **多会话/多标签页**：工作簿级会话持久化与恢复。
- **扩展机制**：受沙箱权限控制的小程序加载。
- **Python / tmux 桥接**：可在 Excel 任务窗格里直接跑本地 Python。
- **Agent Skills**：可加载文件系统 / 扩展目录下的 Skills。
- **零配置 Office 信任**：自动完成共享目录、注册表、自签证书三件套。
- **MOTW 自动清理**：绕过 SmartScreen 的"未知发布者"拦截。

---

## 快速开始

### 用户视角（仅需要 EXE）

1. 从 [Releases](https://github.com/<OWNER>/UIH-Excel-V1/releases) 下载最新 `UIH_AI_Base_PI-vX.Y.Z.exe`。
2. 双击运行，按提示完成证书信任。
3. Excel 自动出现「加载项 → 联影AI」按钮，点击打开侧边栏即可使用。

### 开发者视角（从源码构建）

#### 前置条件

| 工具 | 版本 | 说明 |
| --- | --- | --- |
| Node.js | 22.x | SEA + `NODE_SEA_FUSE_*` 支持 |
| npm | 10.x+ | 依赖管理 |
| Windows | 10/11 x64 | 当前仅打包 Windows 平台 |
| PowerShell | 5.1+ | 证书/注册表/共享目录操作 |
| mkcert（可选） | latest | 本地签发证书工具，未安装时自动降级 |

#### 构建步骤

```powershell
# 1) 拉取前端 dist
# （来自 pi-for-excel 的 vite 构建产物，可使用 release 包中的 dist.blob）

# 2) 打包前端为内嵌 blob
node scripts\build-blob.cjs .\dist\ build\dist.blob

# 3) 生成 SEA 准备文件
npx --yes node-sea sea-config.json
# 产物: build\sea-prep.blob

# 4) 注入 SEA blob 到 EXE
node scripts\inject-sea.cjs release\UIH_AI_Base_PI-v1.0.0.exe build\sea-prep.blob
```

详细流程见 [`docs/UIH-DevSummary.html`](docs/UIH-DevSummary.html) 第 12 章「构建与打包流程」。

---

## 架构概览

```
┌─────────────────────────────────────────────────────────────┐
│                    联影AI_Base_PI.exe                        │
│                  (Node.js 22 SEA, ~83 MB)                   │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │             pi-server.cjs (CommonJS)               │    │
│  │                                                    │    │
│  │  ① 启动检测 (Node SEA 标志位)                       │    │
│  │  ② 解压嵌入资源 (dist.blob / cert / manifest)       │    │
│  │  ③ MOTW 清理 (递归删除 Zone.Identifier)              │    │
│  │  ④ 证书生成 (mkcert/openssl/Node.js/PowerShell)     │    │
│  │  ⑤ 证书信任 (导入 LocalMachine Root)                │    │
│  │  ⑥ 创建共享目录 (\\<host>\UIH_Catalog$)             │    │
│  │  ⑦ 写注册表 (TrustedCatalog)                       │    │
│  │  ⑧ 启动 HTTPS (3000) + 代理 (3003)                  │    │
│  │  ⑨ 自动 Sideload (Excel COM 加载)                   │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                  │
│                          ▼                                  │
│         ┌────────────────────────────────┐                  │
│         │  嵌入资源 (postject 注入)       │                  │
│         │   • dist.blob (前端 ~7 MB)      │                  │
│         │   • manifest.xml                │                  │
│         │   • cert.pem / key.pem          │                  │
│         │   • ExcelWorkbookWithTaskPane   │                  │
│         └────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼ HTTPS (localhost:3000)
                  ┌───────────────────┐
                  │   Microsoft Excel  │
                  │   + 任务窗格加载项 │
                  │   (Office 加载项)  │
                  └───────────────────┘
```

> 完整架构、模块关系、调用时序见 [`docs/UIH-DevSummary.html`](docs/UIH-DevSummary.html) 第 2 章。

---

## 目录结构

```
UIH-Excel-V1/
├── README.md                 # 本文件
├── LICENSE                   # MIT 许可证
├── CHANGELOG.md              # 版本变更日志
├── .gitignore                # Git 忽略规则
├── .gitattributes            # Git 属性（含 LFS）
├── .github/                  # GitHub 配置
│   ├── workflows/            # CI 工作流
│   └── ISSUE_TEMPLATE/       # Issue 模板
├── src/                      # 主程序源码
│   ├── pi-server.cjs         # 本地服务器主程序（46 函数 / ~2000 行）
│   └── manifest.xml          # Office 加载项清单
├── scripts/                  # 构建/打包/调试脚本
│   ├── build-blob.cjs        # 前端目录打包为内嵌 blob
│   ├── inject-sea.cjs        # postject 注入 SEA blob
│   ├── gen-icons.cjs         # 生成 UIH 品牌图标
│   ├── sea-config.json       # Node.js SEA 配置
│   ├── test-ai.cjs           # AI 端点测试
│   └── mock-model-server.cjs # 本地 mock 模型（用于离线调试）
├── release/                  # 打包产物
│   ├── UIH_AI_Base_PI-v1.0.0.exe
│   └── UIH_AI_Base_PI-manifest.xml
├── examples/                 # 示例文件
│   └── ExcelWorkbookWithTaskPane.xlsx
├── docs/                     # 文档（自包含 HTML，离线可读）
│   ├── UIH-ExcelTools-UserGuide.html          # 用户使用手册（完整）
│   ├── UIH-ExcelTools-Chapter07-Features.html # 第 7 章：加载项功能详解
│   ├── UIH-DevSummary.html                    # 开发总结（含 5 种更新场景）
│   ├── _shared-*/                             # 各文档的字体/JS 依赖
│   ├── assets/                                # 章节 7 用到的截图
│   ├── assets-report/                         # 用户手册用到的截图
│   └── screenshots/                           # 任务窗格截图
└── build/                    # 构建中间产物（git 忽略）
```

---

## 构建与发布

详细的构建流程、参数说明、常见问题，请阅读：

- 📘 **开发总结文档**：[`docs/UIH-DevSummary.html`](docs/UIH-DevSummary.html) 第 12 章「构建与打包流程」
- 📗 **软件更新指南**：[`docs/UIH-DevSummary.html`](docs/UIH-DevSummary.html) 第 13 章「软件更新指南」（5 种更新场景对照表）

### 发布检查清单

- [ ] 修改 `package.json` 版本号
- [ ] 修改 `src/pi-server.cjs` 中的常量（`PORT`、`PROXY_PORT` 等）
- [ ] 更新 `CHANGELOG.md`
- [ ] 重新打包 EXE（`build-blob` → `sea` → `inject-sea`）
- [ ] 在 GitHub Releases 上传新版本
- [ ] 更新 README 中"快速开始"小节

---

## 使用文档

| 文档 | 内容 | 适用对象 |
| --- | --- | --- |
| [`UIH-ExcelTools-UserGuide.html`](docs/UIH-ExcelTools-UserGuide.html) | 用户使用手册（10 章节） | 最终用户 |
| [`UIH-ExcelTools-Chapter07-Features.html`](docs/UIH-ExcelTools-Chapter07-Features.html) | 第 7 章：加载项功能详解（14 小节） | 最终用户 |
| [`UIH-DevSummary.html`](docs/UIH-DevSummary.html) | 开发总结（15 章：架构 / 决策 / 错误 / 更新指南） | 维护者 |

> 所有文档为自包含 HTML（内嵌字体/JS），双击即可在浏览器打开，离线可读。

---

## 常见问题

### Q: 双击 EXE 后 Excel 没有出现"联影AI"按钮？

A: 请按以下顺序排查：
1. 检查 `https://localhost:3000` 是否能正常打开。
2. 打开"文件 → 选项 → 信任中心 → 信任中心设置 → 受信任的加载项目录"，确认 `\\<你的电脑名>\UIH_Catalog$` 已存在。
3. 重启 Excel（必须完全退出再重新打开）。
4. 若仍不显示，删除 `%LOCALAPPDATA%\Microsoft\Office\16.0\Wef\` 缓存。

### Q: 浏览器访问 `https://localhost:3000` 提示证书错误？

A: 自签证书未成功安装到"本地计算机 → 受信任的根证书颁发机构"。请用管理员身份重新运行 EXE，或手动执行 `scripts/gen-icons.cjs` 中的 `trustHttpsCert` 函数。

### Q: 重新打包后 EXE 双击闪退？

A: 检查 `NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2` 是否被正确写入（值为 `1`）。详见 `docs/UIH-DevSummary.html` 第 8 章错误 #4。

更多问题见 [`docs/UIH-DevSummary.html`](docs/UIH-DevSummary.html) 第 8 章「关键错误与修复记录」与第 15 章「已知限制」。

---

## 路线图

- [ ] 支持 macOS / Linux（替换 SEA 流程）
- [ ] 集成"自动更新"功能（启动时检测 GitHub Releases）
- [ ] 国际化（英文 / 日文 UI）
- [ ] 内置 Office 365 / Web 加载项模式

完整规划见 [`docs/UIH-DevSummary.html`](docs/UIH-DevSummary.html) 第 15 章。

---

## 许可证

本项目基于 MIT 协议开源。详见 [LICENSE](LICENSE) 文件。

> **注意**：本项目使用了第三方开源组件：
> - [pi-for-excel](https://github.com/tmustier/pi-for-excel)（MIT）
> - Node.js（MIT）
> - postject（MIT）
>
> 这些组件的许可证均与本项目兼容。

---

## 致谢

- 感谢 [tmustier / pi-for-excel](https://github.com/tmustier/pi-for-excel) 提供的优秀开源基础。
- 感谢联影内部测试团队的反馈与建议。

---

<p align="center">
  由 联影 AI 工具链团队 维护
  <br/>
  提交问题：[Issues](../../issues) | 查看历史：[Releases](../../releases)
</p>
