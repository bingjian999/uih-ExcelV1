#requires -Version 5.1
<#
  UIH-Diagnose.ps1
  UIH Excel Tools 远程诊断脚本
  在出问题的电脑上运行,收集诊断信息后发回。
#>

$ErrorActionPreference = 'Continue'
Write-Host "=========================================="
Write-Host "  UIH Excel Tools 诊断脚本"
Write-Host "  $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host "=========================================="
Write-Host ""

# 1. 系统信息
Write-Host "=== 1. 系统信息 ==="
Write-Host "  计算机: $env:COMPUTERNAME"
Write-Host "  用户: $env:USERNAME"
Write-Host "  OS: $((Get-CimInstance Win32_OperatingSystem).Caption)"
Write-Host "  是否管理员: $([Security.Principal.WindowsPrincipal]::new([Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))"
Write-Host ""

# 2. EXE 进程
Write-Host "=== 2. EXE 进程 ==="
$procs = Get-Process -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -match 'UIH|联影|node|Base_PI' }
if ($procs) {
  $procs | ForEach-Object {
    Write-Host "  PID=$($_.Id)  Name=$($_.ProcessName)  Path=$($_.Path)"
  }
} else {
  Write-Host "  未找到 EXE 进程 (可能未启动)"
}
Write-Host ""

# 3. 端口监听
Write-Host "=== 3. 端口监听 ==="
foreach ($port in @(3000, 3003)) {
  $r = Test-NetConnection -ComputerName localhost -Port $port -WarningAction SilentlyContinue -InformationLevel Quiet
  Write-Host "  localhost:$port  $(if ($r) {'✅ 在听'} else {'❌ 未监听'})"
}
Write-Host ""

# 4. 证书检查
Write-Host "=== 4. 证书检查 ==="
$certs = Get-ChildItem Cert:\LocalMachine\Root -ErrorAction SilentlyContinue | Where-Object { $_.Subject -match 'localhost|UIH|PI' }
if ($certs) {
  $certs | ForEach-Object {
    Write-Host "  Subject: $($_.Subject)"
    Write-Host "  Thumbprint: $($_.Thumbprint)"
    Write-Host "  NotAfter: $($_.NotAfter)"
    Write-Host "  ---"
  }
} else {
  Write-Host "  ❌ LocalMachine\Root 中没有 localhost/UIH/PI 证书"
  Write-Host "  → 需要以管理员身份重新运行 EXE"
}
Write-Host ""

$certsUser = Get-ChildItem Cert:\CurrentUser\Root -ErrorAction SilentlyContinue | Where-Object { $_.Subject -match 'localhost|UIH|PI' }
if ($certsUser) {
  Write-Host "  CurrentUser\Root 中有: $($certsUser.Count) 个"
} else {
  Write-Host "  CurrentUser\Root 中没有 localhost/UIH/PI 证书"
}
Write-Host ""

# 5. dist 目录
Write-Host "=== 5. dist 目录 ==="
$distDir = "$env:LOCALAPPDATA\UIH_AI_Base_PI\dist"
if (Test-Path $distDir) {
  $count = (Get-ChildItem $distDir -Recurse -File | Measure-Object).Count
  $size = (Get-ChildItem $distDir -Recurse -File | Measure-Object Length -Sum).Sum
  Write-Host "  路径: $distDir"
  Write-Host "  文件数: $count"
  Write-Host "  大小: $([math]::Round($size / 1MB, 2)) MB"
  $taskpane = Join-Path $distDir "src\taskpane.html"
  if (Test-Path $taskpane) {
    Write-Host "  taskpane.html: ✅ 存在 ($((Get-Item $taskpane).Length) bytes)"
  } else {
    Write-Host "  taskpane.html: ❌ 不存在"
  }
} else {
  Write-Host "  ❌ dist 目录不存在: $distDir"
  Write-Host "  → EXE 可能未成功解压内嵌资源"
}
Write-Host ""

# 6. HTTPS 测试
Write-Host "=== 6. HTTPS 连接测试 ==="
try {
  $resp = Invoke-WebRequest -Uri 'https://localhost:3000/' -UseBasicParsing -TimeoutSec 10 -SkipCertificateCheck
  Write-Host "  https://localhost:3000/  ✅ HTTP $($resp.StatusCode)"
  Write-Host "  Content-Length: $($resp.Content.Length) bytes"
  Write-Host "  前 200 字符: $($resp.Content.Substring(0, [Math]::Min(200, $resp.Content.Length)))"
} catch {
  Write-Host "  https://localhost:3000/  ❌ $($_.Exception.Message)"
}
Write-Host ""

try {
  $resp2 = Invoke-WebRequest -Uri 'https://localhost:3000/src/taskpane.html' -UseBasicParsing -TimeoutSec 10 -SkipCertificateCheck
  Write-Host "  taskpane.html  ✅ HTTP $($resp2.StatusCode)  ($($resp2.Content.Length) bytes)"
} catch {
  Write-Host "  taskpane.html  ❌ $($_.Exception.Message)"
}
Write-Host ""

try {
  $resp3 = Invoke-WebRequest -Uri 'https://localhost:3000/assets/' -UseBasicParsing -TimeoutSec 10 -SkipCertificateCheck
  Write-Host "  /assets/  ✅ HTTP $($resp3.StatusCode)"
} catch {
  Write-Host "  /assets/  ❌ $($_.Exception.Message)"
}
Write-Host ""

# 7. Office 信任目录
Write-Host "=== 7. Office 信任目录 ==="
$regPaths = @(
  'HKCU:\Software\Microsoft\Office\16.0\WEF\TrustedCatalogs',
  'HKLM:\Software\Microsoft\Office\16.0\WEF\TrustedCatalogs'
)
foreach ($rp in $regPaths) {
  if (Test-Path $rp) {
    Write-Host "  $rp :"
    Get-ChildItem $rp | ForEach-Object {
      $id = $_.PSChildName
      $url = (Get-ItemProperty $_.PSPath -ErrorAction SilentlyContinue).Url
      $flags = (Get-ItemProperty $_.PSPath -ErrorAction SilentlyContinue).Flags
      Write-Host "    ID=$id  Url=$url  Flags=$flags"
    }
  } else {
    Write-Host "  $rp : 不存在"
  }
}
Write-Host ""

# 8. 共享目录
Write-Host "=== 8. 共享目录 ==="
$shares = Get-SmbShare -ErrorAction SilentlyContinue | Where-Object { $_.Name -match 'UIH|Catalog' }
if ($shares) {
  $shares | ForEach-Object { Write-Host "  $($_.Name) -> $($_.Path)" }
} else {
  Write-Host "  ❌ 未找到 UIH_Catalog$ 共享"
}
Write-Host ""

# 9. manifest 文件
Write-Host "=== 9. manifest 文件 ==="
$manifestPath = "$env:LOCALAPPDATA\UIH_AI_Base_PI\manifest.xml"
if (Test-Path $manifestPath) {
  Write-Host "  ✅ $manifestPath ($((Get-Item $manifestPath).Length) bytes)"
} else {
  Write-Host "  ❌ manifest.xml 不存在"
}
# 共享目录里的 manifest
$shareManifest = "\\$env:COMPUTERNAME\UIH_Catalog$\UIH_AI_Base_PI-manifest.xml"
if (Test-Path $shareManifest) {
  Write-Host "  ✅ $shareManifest"
} else {
  Write-Host "  ❌ 共享目录中的 manifest 不存在"
}
Write-Host ""

# 10. Office 缓存
Write-Host "=== 10. Office 缓存 ==="
$wef = "$env:LOCALAPPDATA\Microsoft\Office\16.0\Wef"
if (Test-Path $wef) {
  $wefSize = (Get-ChildItem $wef -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum
  Write-Host "  Wef 目录存在: $([math]::Round($wefSize / 1KB, 1)) KB"
} else {
  Write-Host "  Wef 目录不存在 (正常)"
}
Write-Host ""

# 11. 防火墙
Write-Host "=== 11. 防火墙规则 ==="
$fwRules = Get-NetFirewallRule -ErrorAction SilentlyContinue | Where-Object { $_.DisplayName -match 'UIH|联影|3000|3003' }
if ($fwRules) {
  $fwRules | ForEach-Object { Write-Host "  $($_.DisplayName) ($($_.Direction))" }
} else {
  Write-Host "  未找到 UIH 相关防火墙规则"
}
Write-Host ""

Write-Host "=========================================="
Write-Host "  诊断完成。请把以上全部输出截图发回。"
Write-Host "=========================================="
