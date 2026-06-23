# 二次开发与构建指南

> 本指南面向**联影内部或其他贡献者**，说明如何从源码构建并二次开发 UIH Excel Tools。

## 1. 仓库结构

```
UIH-Excel-V1/
├── src/                        # 源代码（合并自上游 pi-for-excel 与 UIH 定制）
│   ├── _uih/                   # UIH 定制部分（入口与 EXE 后端）
│   │   ├── pi-server.cjs       # 主入口：Node.js SEA 加载的前端服务器
│   │   └── manifest.xml        # UIH 品牌的 Office 加载项清单
│   ├── taskpane/               # 上游 TypeScript 前端入口
│   ├── ui/                     # 上游 UI 组件（lit 框架）
│   ├── tools/                  # 上游 16 个内置 Excel 工具
│   ├── commands/               # 上游 20+ 斜杠命令
│   ├── extensions/             # 上游 扩展机制
│   ├── skills/                 # 上游 Agent Skills
│   ├── workbook/               # 上游 工作簿/会话管理
│   ├── stubs/                  # 上游 vite 构建时的 stub 模块
│   └── ...                     # 共 ~350 个 TS 文件
├── dist/                       # vite 构建产物（已提交，供二次开发参考）
├── tests/                      # 上游 100+ 单元测试
├── scripts/                    # 工具脚本
│   ├── _uih/                   # UIH 定制：SEA 打包 / 图标生成 / 模型测试
│   ├── cors-proxy-server.mjs   # 上游：CORS 代理
│   ├── python-bridge-server.mjs
│   ├── tmux-bridge-server.mjs
│   ├── generate-manifest.mjs
│   ├── validate-manifest.mjs
│   └── ...                     # 共 21 个脚本
├── public/                     # 静态资源（图标、HTML 入口、XML manifest）
├── release/                    # 打包产物（EXE 在 GitHub Releases）
├── docs/                       # 文档（HTML）
├── examples/                   # 示例工作簿
├── vite.config.ts              # 前端构建配置
├── tsconfig.json               # TypeScript 配置
├── eslint.config.js            # ESLint 配置
├── sea-config.json             # Node.js SEA 配置（_uih 专用）
├── package.json                # 依赖与脚本入口
└── README.md                   # 项目说明
```

## 2. 环境准备

### 2.1 必备工具

| 工具 | 版本 | 用途 |
| --- | --- | --- |
| Node.js | 22.19+ 或 24+ | 运行 + 构建（SEA 需要 22+） |
| npm | 10+ | 依赖管理 |
| Windows | 10/11 x64 | **目标平台**（EXE 仅打包 Windows） |
| PowerShell | 5.1+ | 证书/注册表/共享目录操作 |
| mkcert（可选） | latest | 生成本地 HTTPS 证书 |
| Visual Studio Build Tools | 2022 | Node.js 原生模块编译（罕见需要） |

### 2.2 首次克隆

```bash
git clone https://github.com/bingjian999/uih-ExcelV1.git
cd uih-ExcelV1
npm install
```

`npm install` 会安装：

- 上游核心：`@earendil-works/pi-agent-core` / `pi-ai` / `pi-web-ui`
- 上游 UI 框架：`lit` / `marked`
- 上游 SDK：`@anthropic-ai/sdk`
- 构建工具：`vite` / `typescript` / `eslint` / `typescript-eslint`
- Office 工具：`@types/office-js` / `office-addin-debugging` / `office-addin-manifest`
- UIH 定制：`postject`（SEA blob 注入）

## 3. 二次开发场景

### 3.1 修改前端 UI / 工具

前端是 **TypeScript + Vite + Lit** 项目。

```bash
# 开发模式（带热重载,localhost:3000）
npm run dev

# 生产构建（输出到 dist/）
npm run build

# 验证产物（检查 dist/ 是否完整）
npm run check
```

修改的文件主要是：

- `src/taskpane/`: 任务窗格主入口
- `src/ui/`: UI 组件（每个 `.ts` 是一个 lit 组件）
- `src/tools/`: 16 个内置 Excel 工具
- `src/commands/`: 20+ 斜杠命令

### 3.2 修改后端（Node.js SEA 入口）

后端是 **`src/_uih/pi-server.cjs`**（CommonJS，约 2000 行）。

修改后需要重新打包 EXE。详见 [§5 重新打包 EXE](#5-重新打包-exe)。

### 3.3 修改 Office 加载项清单

**`src/_uih/manifest.xml`**：调整 DisplayName、Icon、Group、按钮等品牌信息。

修改后可以用上游的校验脚本验证：

```bash
npm run validate
```

### 3.4 添加新依赖

```bash
# 运行时依赖（会打包进 EXE）
npm install <package>@<version>

# 开发依赖
npm install -D <package>@<version>
```

## 4. 单元测试

```bash
# 安全相关测试
npm run test:security

# 单独跑某个测试
node --test --experimental-strip-types tests/oauth-storage-security.test.ts
```

## 5. 重新打包 EXE

> 完整流程见 `docs/UIH-DevSummary.html` 第 12 章。

### 5.1 前置条件

- `dist/` 已构建（`npm run build`）
- 准备一个空 EXE 模板（`release/UIH_AI_Base_PI-v1.0.0.exe`，约 83 MB 的 Node.js SEA 模板）

### 5.2 打包步骤

```bash
# 1) 把 dist/ 打成内嵌 blob
npm run uih:build:blob

# 2) 用 Node.js SEA 把 src/_uih/pi-server.cjs 编译成 blob
npm run uih:build:sea

# 3) 把 blob 注入到 EXE 模板
npm run uih:build:inject
```

### 5.3 验证 EXE

```bash
# 双击运行 EXE,然后:
# - 检查 https://localhost:3000 能否访问
# - 检查 Excel 加载项是否出现 "联影AI" 按钮
# - 检查任务窗格能否正常打开
```

## 6. 常见问题

### Q: npm install 失败,提示 `EBUSY: resource busy or locked`

Windows 上偶尔会因杀毒软件锁定 `node_modules/.package-lock.json` 失败。

```bash
# 关闭杀毒软件,或:
npm install --no-package-lock
```

### Q: vite build 失败,提示某个模块找不到

```bash
# 清掉缓存
rm -rf node_modules/.vite
npm run build
```

### Q: SEA 注入后 EXE 双击闪退

检查 `node_modules/sea-prep.blob` 是否生成了，看控制台有无错误。

更详细：见 `docs/UIH-DevSummary.html` 第 8 章「关键错误与修复记录」。

### Q: 怎么 debug SEA 后的 EXE？

把 `pi-server.cjs` 单独运行：

```bash
# 不用 SEA,直接跑
node src/_uih/pi-server.cjs
# 然后浏览器访问 http://localhost:3000
```

## 7. 贡献流程

1. **Fork** 本仓库
2. 在 `feat/xxx` 分支上提交修改
3. 跑 `npm run check` 和 `npm run test:security`
4. 提交 **Pull Request** 到 `main` 分支
5. 在 PR 描述中：
   - 说明改动的目的
   - 是否需要重新打包 EXE
   - 是否影响 `manifest.xml` 兼容性

## 8. 商标与品牌

- 上游项目 [pi-for-excel](https://github.com/tmustier/pi-for-excel) 是 MIT 协议开源
- 本仓库 (UIH Excel Tools) 在保留上游版权的前提下，添加了联影品牌的定制与打包
- 联影 AI 工具链团队保留对 UIH 品牌的全部权利

## 9. 相关链接

- **上游项目**：https://github.com/tmustier/pi-for-excel
- **本仓库**：https://github.com/bingjian999/uih-ExcelV1
- **开发总结**：[`docs/UIH-DevSummary.html`](UIH-DevSummary.html)
- **用户手册**：[`docs/UIH-ExcelTools-UserGuide.html`](UIH-ExcelTools-UserGuide.html)
- **章节 7 详解**：[`docs/UIH-ExcelTools-Chapter07-Features.html`](UIH-ExcelTools-Chapter07-Features.html)
