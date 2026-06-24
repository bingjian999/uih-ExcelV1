# UIH Excel Tools 远程诊断与排查指南

> 当其他电脑上出现"加载后无法显示""localhost 报错""任务窗格空白"等问题时，按本指南排查。

## 快速诊断（30 秒）

在出问题的电脑上，**以管理员身份**打开 PowerShell，运行：

```powershell
# 把 UIH-Diagnose.ps1 拷到目标电脑后执行
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\UIH-Diagnose.ps1
```

脚本会输出 11 项诊断信息，截图发回即可定位问题。

## 常见问题与解决

### 问题 1: 任务窗格空白 / 白屏

**最常见原因：证书未信任**

`pi-server.cjs` 的 `trustHttpsCert()` 需要管理员权限把自签证书导入 `Cert:\LocalMachine\Root`。如果用户**没有以管理员身份运行 EXE**，证书不会进 Root store，浏览器/Office webview 会拒绝 HTTPS 连接。

**解决：**

1. 完全退出 Excel
2. 右键 EXE → **以管理员身份运行**
3. 等待控制台显示：
   - `证书已安装到 LocalMachine\Root`
   - `HTTPS 服务已启动 (https://localhost:3000)`
4. 重新打开 Excel

**验证：**

```powershell
# 检查证书是否在 Root store
Get-ChildItem Cert:\LocalMachine\Root | Where-Object { $_.Subject -match 'localhost' }
```

### 问题 2: 浏览器访问 https://localhost:3003 报错

**原因：3003 是 CORS 代理端口，不是给用户直接访问的**

| 端口 | 用途 | 正确 URL |
| --- | --- | --- |
| **3000** | Office 加载项前端（taskpane） | `https://localhost:3000` |
| **3003** | CORS 代理（AI 模型请求转发） | `https://localhost:3003/?url=<目标URL>` |

直接访问 `https://localhost:3003` 会返回 `缺少或无效的 ?url= 查询参数`，这是**正常行为**，不是错误。

### 问题 3: EXE 双击后没反应

**原因：MOTW（Mark of the Web）或 SmartScreen 拦截**

**解决：**

```powershell
# 解除 MOTW
$exePath = "C:\path\to\联影AI_Base_PI.exe"
Remove-Item -LiteralPath "$exePath:Zone.Identifier" -Force -ErrorAction SilentlyContinue

# 或右键 EXE → 属性 → 勾选"解除锁定" → 确定
```

然后重新双击运行。

### 问题 4: Excel 没有出现"联影AI"按钮

**原因：Office 信任目录未注册**

**排查：**

```powershell
# 检查注册表
Get-ItemProperty 'HKCU:\Software\Microsoft\Office\16.0\WEF\TrustedCatalogs\{a1b2c3d4-e5f6-7890-abcd-ef1234567890}' -ErrorAction SilentlyContinue

# 检查共享目录
Get-SmbShare | Where-Object { $_.Name -match 'UIH|Catalog' }

# 检查 manifest
Test-Path "\\$env:COMPUTERNAME\UIH_Catalog$\UIH_AI_Base_PI-manifest.xml"
```

**解决：** 以管理员身份重新运行 EXE（会自动创建共享目录 + 写注册表）。

### 问题 5: 之前装过旧版本，现在冲突

**解决：清除 Office 加载项缓存**

```powershell
# 关闭 Excel 后执行
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\Microsoft\Office\16.0\Wef" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\Microsoft\Office\16.0\OfficeAddinsCache" -ErrorAction SilentlyContinue
```

然后重新打开 Excel。

### 问题 6: 首次加载很慢（10-30 秒）

**原因：** 任务窗格需要加载 ~10 MB 的 JS/CSS/字体（taskpane-*.js 1.3MB + 90 个 UI 组件 + Mermaid + ECharts + 字体）。

**解决：** 等待即可。首次加载后浏览器会缓存，第二次打开会快很多。

### 问题 7: 端口被占用

**排查：**

```powershell
# 看 3000/3003 被谁占用
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object LocalAddress, LocalPort, State, OwningProcess
Get-NetTCPConnection -LocalPort 3003 -ErrorAction SilentlyContinue | Select-Object LocalAddress, LocalPort, State, OwningProcess
```

**解决：**

```powershell
# 杀掉占用端口的进程
Stop-Process -Id <PID> -Force
# 或修改 EXE 的端口（设置环境变量后运行）
$env:PI_PORT = "3001"
$env:PI_PROXY_PORT = "3004"
.\联影AI_Base_PI.exe
```

## 完整诊断脚本

[`UIH-Diagnose.ps1`](../UIH-Diagnose.ps1) 会检查以下 11 项：

1. 系统信息（计算机名、OS、是否管理员）
2. EXE 进程是否在运行
3. 端口 3000/3003 是否在监听
4. 证书是否在 LocalMachine\Root
5. dist 目录是否解压成功
6. HTTPS 连接测试（根路径 + taskpane.html + /assets/）
7. Office 信任目录注册表
8. 共享目录 UIH_Catalog$
9. manifest 文件是否存在
10. Office 缓存状态
11. 防火墙规则

## 联系支持

把诊断脚本的输出截图发回，附上：
- 出问题的电脑的 Windows 版本（`winver`）
- Excel 版本（文件 → 账户 → 关于 Excel）
- EXE 启动时控制台的输出截图
