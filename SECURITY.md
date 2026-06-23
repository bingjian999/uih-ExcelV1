# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

请通过以下方式报告安全问题（**请勿**在公开 Issue 中描述漏洞细节）：

- 邮件：security@example.local
- 加密：使用仓库 `SECURITY.md` 中的 PGP 公钥
- 内部飞书：搜索"联影 AI 工具链"安全组

我们承诺在收到报告后 48 小时内确认，7 个工作日内给出修复计划。

## 已知安全特性

- 自签证书仅写入 `Cert:\LocalMachine\Root`（管理员作用域）
- Excel 加载项清单强制签名
- 嵌入资源（dist.blob）SHA-256 校验
- PowerShell `$` 转义保护（使用临时 .ps1 文件而非 `shell: true`）
- 不收集任何遥测数据
- 所有 AI 调用走本地代理（3003），不上传到任何第三方分析平台
