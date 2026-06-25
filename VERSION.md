# 版本信息

| 字段 | 值 |
|------|-----|
| 当前版本 | **v1.0.7** (hotfix) |
| 发布日期 | 2026-06-25 |
| 基于 | pi-for-excel v0.9.5-pre |
| Git tag | `v1.0.7` |
| GitHub Release | https://github.com/bingjian999/uih-ExcelV1/releases/tag/v1.0.7 |
| EXE 下载 | https://github.com/bingjian999/uih-ExcelV1/releases/download/v1.0.7/UIH_AI_Base_PI-v1.0.7.exe |
| EXE 大小 | 86,809,088 bytes (~82.8 MB) |
| 构建方式 | postject --overwrite (基于 v1.0.0 EXE 基底) |
| 内嵌证书 | 自签名 RSA 2048, 10年有效期, localhost+127.0.0.1 |
| 证书信任 | 自动安装到 Windows 受信任根证书存储 (trustCert) |
| 调试工具 | UIH_AI_Base_PI-Debug.bat (纯 ASCII, 崩溃后窗口不关闭) |
| 日志文件 | %LOCALAPPDATA%\UIH_AI_Base_PI\server.log |
| 状态 | **已发布** |

## 版本类型说明

| 类型 | 触发条件 | 示例 |
|------|---------|------|
| **major (X.0.0)** | 重大架构变更、API 不兼容 | 1.0.0 → 2.0.0 |
| **minor (1.X.0)** | 新功能、新增工具、新增模型 | 1.0.0 → 1.1.0 |
| **patch (1.0.X)** | Bug 修复、文档更新、UI 微调 | 1.0.0 → 1.0.1 |
| **hotfix** | 紧急修复，影响所有用户的 P0 级 bug | 1.0.1 → 1.0.1-hotfix.X |

## 命名约定

- Git tag：`v<semver>` (e.g. `v1.0.1`)
- Git branch：`release/v1.0.1` 或 `hotfix/v1.0.1`
- EXE 文件名：`UIH_AI_Base_PI-v<semver>.exe` (e.g. `UIH_AI_Base_PI-v1.0.1.exe`)
- dist.blob 版本文件：纯文本，写入 semver 字符串

## 上传流程（标准）

1. **本地修改** → 测试
2. **更新 CHANGELOG.md** 和本文件
3. **Git commit**：`<type>(<scope>): <subject>`
   - type: feat / fix / docs / refactor / perf / test / chore
   - 例：`fix(taskpane): correct asset paths in dist/src/taskpane.html`
4. **Git tag**：`git tag -a v1.0.1 -m "Release v1.0.1"`
5. **推送到 GitHub**：
   - 主分支：`git push origin main`
   - Tag：`git push origin v1.0.1`
6. **创建 GitHub Release**（基于 tag，附 CHANGELOG 摘要 + EXE 资产）
7. **更新本文档**标记为"已发布"
