# 版本信息

## 当前版本

| 字段 | UIH 版 | EY 版 |
|------|--------|-------|
| 版本号 | **v1.3.0** | **ey-v1.0.0** |
| 发布日期 | 2026-07-06 | 2026-07-10 |
| 基于 | pi-for-excel v0.9.5-pre | UIH-Excel v1.3.0 |
| Git tag | `v1.3.0` | `ey-v1.0.0` |
| GitHub Release | [v1.3.0](https://github.com/bingjian999/uih-ExcelV1/releases/tag/v1.3.0) | [ey-v1.0.0](https://github.com/bingjian999/uih-ExcelV1/releases/tag/ey-v1.0.0) |
| EXE 下载 | [UIH_AI_Base_PI-v1.3.0.exe](https://github.com/bingjian999/uih-ExcelV1/releases/download/v1.3.0/UIH_AI_Base_PI-v1.3.0.exe) | [EY_AI_Base-v1.0.0.exe](https://github.com/bingjian999/uih-ExcelV1/releases/download/ey-v1.0.0/EY_AI_Base-v1.0.0.exe) |
| EXE 大小 | ~84 MB | ~83 MB |
| 品牌 | 联影AI_Base_PI | 安永AI_Base |
| 状态 | **已发布** | **已发布** |

## 版本历史

| 版本 | 日期 | 类型 | 说明 |
|------|------|------|------|
| ey-v1.0.0 | 2026-07-10 | major | 安永品牌版首发；基于 UIH v1.3.0 重新品牌化；证书信任增强 |
| v1.3.0 | 2026-07-06 | minor | Pi 栈升级 0.80.3；代理端口回退；compat 别名 |
| v1.2.2 | 2026-07-02 | patch | pi-for-excel 命令替换为 uih-excel；CHANGELOG 归档 |
| v1.2.1 | 2026-07-01 | patch | π 图标修复为 UIH |
| v1.2.0 | 2026-07-01 | minor | 27 个文件全面中文本地化 |
| v1.1.3 | 2026-06-28 | patch | GitHub Release 上传修复 |
| v1.0.7 | 2026-06-25 | hotfix | 紧急修复 |

## 版本类型说明

| 类型 | 触发条件 | 示例 |
|------|---------|------|
| **major (X.0.0)** | 重大架构变更、品牌更换 | 1.0.0 → 2.0.0 |
| **minor (1.X.0)** | 新功能、新增工具、新增模型 | 1.0.0 → 1.1.0 |
| **patch (1.0.X)** | Bug 修复、文档更新、UI 微调 | 1.0.0 → 1.0.1 |
| **hotfix** | 紧急修复，影响所有用户的 P0 级 bug | 1.0.1 → 1.0.1-hotfix.X |

## 命名约定

### UIH 版
- Git tag：`v<semver>` (e.g. `v1.3.0`)
- EXE 文件名：`UIH_AI_Base_PI-v<semver>.exe`
- 日志目录：`%LOCALAPPDATA%\UIH_AI_Base_PI\`

### EY 版
- Git tag：`ey-v<semver>` (e.g. `ey-v1.0.0`)
- EXE 文件名：`EY_AI_Base-v<semver>.exe`
- 日志目录：`%LOCALAPPDATA%\EY_AI_Base\`
- 源码备份：GitHub `ey/` 目录

## 构建方式

- Node.js 22 SEA (Single Executable Application)
- postject 注入（`--overwrite` 模式）
- 内嵌自签名证书 RSA 2048, 10年有效期, localhost+127.0.0.1
- 证书信任：4 级回退（PowerShell LocalMachine → CurrentUser → certutil → certutil -f）

## 上传流程（标准）

1. **本地修改** → 测试
2. **更新 CHANGELOG.md** 和本文件
3. **构建 EXE**（清理缓存 → Vite build → blob → SEA → inject）
4. **创建 GitHub Release**（附 CHANGELOG 摘要 + EXE 资产）
5. **上传源码**到 GitHub `ey/` 目录
6. **更新本文档**标记为"已发布"
