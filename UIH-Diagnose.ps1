#requires -Version 5.1
<#
  UIH-Diagnose.ps1  (ASCII-safe version)
  UIH Excel Tools remote diagnostic script.
  Run on the problematic machine, send back the output.
#>

$ErrorActionPreference = 'Continue'
Write-Host "=========================================="
Write-Host "  UIH Excel Tools Diagnostic Script"
Write-Host "  $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host "=========================================="
Write-Host ""

# 1. System info
Write-Host "=== 1. System Info ==="
Write-Host "  Computer:  $env:COMPUTERNAME"
Write-Host "  User:      $env:USERNAME"
Write-Host "  OS:        $((Get-CimInstance Win32_OperatingSystem).Caption)"
$isAdmin = ([Security.Principal.WindowsPrincipal]::new([Security.Principal.WindowsIdentity]::GetCurrent())).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
Write-Host "  IsAdmin:   $isAdmin"
Write-Host ""

# 2. EXE process
Write-Host "=== 2. EXE Process ==="
$procs = Get-Process -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -match 'UIH|node|Base_PI' }
if ($procs) {
  $procs | ForEach-Object {
    Write-Host "  PID=$($_.Id)  Name=$($_.ProcessName)  Path=$($_.Path)"
  }
} else {
  Write-Host "  [NOT FOUND] No EXE process running"
}
Write-Host ""

# 3. Port listening
Write-Host "=== 3. Port Listening ==="
foreach ($port in @(3000, 3003)) {
  $r = Test-NetConnection -ComputerName localhost -Port $port -WarningAction SilentlyContinue -InformationLevel Quiet
  if ($r) {
    Write-Host "  localhost:$port  [OK] listening"
  } else {
    Write-Host "  localhost:$port  [FAIL] not listening"
  }
}
Write-Host ""

# 4. Certificate check
Write-Host "=== 4. Certificate Check ==="
Write-Host "  --- LocalMachine\Root ---"
$certs = Get-ChildItem Cert:\LocalMachine\Root -ErrorAction SilentlyContinue | Where-Object { $_.Subject -match 'localhost|UIH|PI' }
if ($certs) {
  $certs | ForEach-Object {
    Write-Host "  Subject:    $($_.Subject)"
    Write-Host "  Thumbprint: $($_.Thumbprint)"
    Write-Host "  NotAfter:   $($_.NotAfter)"
    Write-Host "  ---"
  }
} else {
  Write-Host "  [FAIL] No localhost/UIH/PI cert in LocalMachine\Root"
  Write-Host "  -> Need to run EXE as Administrator"
}
Write-Host ""

Write-Host "  --- CurrentUser\Root ---"
$certsUser = Get-ChildItem Cert:\CurrentUser\Root -ErrorAction SilentlyContinue | Where-Object { $_.Subject -match 'localhost|UIH|PI' }
if ($certsUser) {
  Write-Host "  Found $($certsUser.Count) cert(s) in CurrentUser\Root"
} else {
  Write-Host "  [NONE] No localhost/UIH/PI cert in CurrentUser\Root"
}
Write-Host ""

# 5. dist directory
Write-Host "=== 5. dist Directory ==="
$distDir = "$env:LOCALAPPDATA\UIH_AI_Base_PI\dist"
if (Test-Path $distDir) {
  $count = (Get-ChildItem $distDir -Recurse -File | Measure-Object).Count
  $size = (Get-ChildItem $distDir -Recurse -File | Measure-Object Length -Sum).Sum
  Write-Host "  Path:      $distDir"
  Write-Host "  FileCount: $count"
  Write-Host "  Size:      $([math]::Round($size / 1MB, 2)) MB"
  $taskpane = Join-Path $distDir "src\taskpane.html"
  if (Test-Path $taskpane) {
    Write-Host "  taskpane.html: [OK] exists ($((Get-Item $taskpane).Length) bytes)"
  } else {
    Write-Host "  taskpane.html: [FAIL] not found"
  }
} else {
  Write-Host "  [FAIL] dist directory not found: $distDir"
  Write-Host "  -> EXE may have failed to extract embedded resources"
}
Write-Host ""

# 6. HTTPS test
Write-Host "=== 6. HTTPS Connection Test ==="
try {
  $resp = Invoke-WebRequest -Uri 'https://localhost:3000/' -UseBasicParsing -TimeoutSec 10 -SkipCertificateCheck
  Write-Host "  https://localhost:3000/         [OK] HTTP $($resp.StatusCode)"
  Write-Host "  Content-Length: $($resp.Content.Length) bytes"
  $preview = $resp.Content.Substring(0, [Math]::Min(200, $resp.Content.Length))
  Write-Host "  Preview: $preview"
} catch {
  Write-Host "  https://localhost:3000/         [FAIL] $($_.Exception.Message)"
}
Write-Host ""

try {
  $resp2 = Invoke-WebRequest -Uri 'https://localhost:3000/src/taskpane.html' -UseBasicParsing -TimeoutSec 10 -SkipCertificateCheck
  Write-Host "  taskpane.html                   [OK] HTTP $($resp2.StatusCode) ($($resp2.Content.Length) bytes)"
} catch {
  Write-Host "  taskpane.html                   [FAIL] $($_.Exception.Message)"
}
Write-Host ""

# 7. Office Trusted Catalogs
Write-Host "=== 7. Office Trusted Catalogs ==="
$regPaths = @(
  'HKCU:\Software\Microsoft\Office\16.0\WEF\TrustedCatalogs',
  'HKLM:\Software\Microsoft\Office\16.0\WEF\TrustedCatalogs'
)
foreach ($rp in $regPaths) {
  if (Test-Path $rp) {
    Write-Host "  $rp :"
    Get-ChildItem $rp -ErrorAction SilentlyContinue | ForEach-Object {
      $id = $_.PSChildName
      $url = (Get-ItemProperty $_.PSPath -ErrorAction SilentlyContinue).Url
      $flags = (Get-ItemProperty $_.PSPath -ErrorAction SilentlyContinue).Flags
      Write-Host "    ID=$id  Url=$url  Flags=$flags"
    }
  } else {
    Write-Host "  $rp : [NOT EXIST]"
  }
}
Write-Host ""

# 8. Shared folder
Write-Host "=== 8. Shared Folder ==="
$shares = Get-SmbShare -ErrorAction SilentlyContinue | Where-Object { $_.Name -match 'UIH|Catalog' }
if ($shares) {
  $shares | ForEach-Object { Write-Host "  $($_.Name) -> $($_.Path)" }
} else {
  Write-Host "  [FAIL] UIH_Catalog$ share not found"
}
Write-Host ""

# 9. manifest file
Write-Host "=== 9. Manifest File ==="
$manifestPath = "$env:LOCALAPPDATA\UIH_AI_Base_PI\manifest.xml"
if (Test-Path $manifestPath) {
  Write-Host "  [OK] $manifestPath ($((Get-Item $manifestPath).Length) bytes)"
} else {
  Write-Host "  [FAIL] manifest.xml not found at $manifestPath"
}
$shareManifest = "\\$env:COMPUTERNAME\UIH_Catalog$\UIH_AI_Base_PI-manifest.xml"
if (Test-Path $shareManifest) {
  Write-Host "  [OK] $shareManifest"
} else {
  Write-Host "  [FAIL] manifest not found in shared folder"
}
Write-Host ""

# 10. Office cache
Write-Host "=== 10. Office Cache ==="
$wef = "$env:LOCALAPPDATA\Microsoft\Office\16.0\Wef"
if (Test-Path $wef) {
  $wefSize = (Get-ChildItem $wef -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum
  Write-Host "  Wef dir exists: $([math]::Round($wefSize / 1KB, 1)) KB"
} else {
  Write-Host "  Wef dir not exist (normal)"
}
Write-Host ""

# 11. Firewall rules
Write-Host "=== 11. Firewall Rules ==="
$fwRules = Get-NetFirewallRule -ErrorAction SilentlyContinue | Where-Object { $_.DisplayName -match 'UIH|3000|3003' }
if ($fwRules) {
  $fwRules | ForEach-Object { Write-Host "  $($_.DisplayName) ($($_.Direction))" }
} else {
  Write-Host "  No UIH-related firewall rules found"
}
Write-Host ""

Write-Host "=========================================="
Write-Host "  Diagnostic complete."
Write-Host "  Please screenshot all output above and send back."
Write-Host "=========================================="
