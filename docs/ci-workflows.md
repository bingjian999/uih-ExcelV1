# CI Workflows

> **注意**: 由于 Fine-grained Personal Access Token 默认限制对 .github/workflows/ 路径的写访问,
> 本仓库的 CI 配置文件保存在 docs/ 目录作为存档。如需启用 GitHub Actions,
> 请把以下两个文件内容复制到 .github/workflows/ 目录中。

---

## ci.yml

```yaml
name: ci

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  sanity:
    name: Repository sanity check
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check required files
        shell: pwsh
        run: |
          $required = @(
            "README.md",
            "LICENSE",
            "CHANGELOG.md",
            ".gitignore",
            "src\pi-server.cjs",
            "src\manifest.xml",
            "scripts\build-blob.cjs",
            "scripts\inject-sea.cjs"
          )
          foreach ($p in $required) {
            if (-not (Test-Path $p)) { throw "Missing: $p" }
          }
          Write-Host "All required files present."
      - name: Validate manifest.xml
        shell: pwsh
        run: |
          [xml]$m = Get-Content "src\manifest.xml"
          if (-not $m.OfficeApp.Id) { throw "manifest.xml missing <Id>" }
          if (-not $m.OfficeApp.Version) { throw "manifest.xml missing <Version>" }
          Write-Host "manifest.xml OK"
      - name: Detect secrets
        shell: pwsh
        run: |
          $secrets = @(
            "AKIA[0-9A-Z]{16}",
            "sk-[A-Za-z0-9]{20,}",
            "ghp_[A-Za-z0-9]{20,}",
            "xox[abp]-[A-Za-z0-9-]{10,}"
          )
          $hits = 0
          foreach ($rx in $secrets) {
            $matches = Select-String -Path "src\*","scripts\*","*.md" -Pattern $rx -ErrorAction SilentlyContinue
            if ($matches) {
              $hits++
              Write-Warning "Potential secret match: $rx"
              $matches | ForEach-Object { Write-Host "  $($_.Path):$($_.LineNumber): $($_.Line)" }
            }
          }
          if ($hits -gt 0) { exit 1 }
          Write-Host "No secret patterns found."

```

## build-windows.yml

```yaml
name: build-windows

on:
  push:
    branches: [ main, develop ]
    tags: [ 'v*' ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    name: Build UIH_AI_Base_PI EXE
    runs-on: windows-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          lfs: true

      - name: Setup Node.js 22
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm install --no-audit --no-fund

      - name: Verify structure
        shell: pwsh
        run: |
          Write-Host "Verifying repository structure..."
          $required = @("src\pi-server.cjs", "src\manifest.xml", "scripts\build-blob.cjs", "scripts\inject-sea.cjs")
          foreach ($p in $required) {
            if (-not (Test-Path $p)) { throw "Missing required file: $p" }
            Write-Host "  OK: $p"
          }

      - name: Lint (placeholder)
        run: echo "Lint step placeholder - add eslint when ready"

      - name: Build (placeholder)
        shell: pwsh
        run: |
          Write-Host "Build step placeholder."
          Write-Host "To complete: upload the prebuilt dist/ from a developer machine or wire up a vite build job."

      - name: Upload artifact (placeholder)
        if: startsWith(github.ref, 'refs/tags/v')
        uses: actions/upload-artifact@v4
        with:
          name: UIH_AI_Base_PI-${{ github.ref_name }}
          path: |
            release/UIH_AI_Base_PI-*.exe
            release/UIH_AI_Base_PI-manifest.xml
          if-no-files-found: warn

```

---

# EXE 分卷下载与恢复

由于 GitHub Contents API 不支持大于 ~100 MB 的单文件,而本仓库的 UIH_AI_Base_PI-v1.0.0.exe 为 82.78 MB,GitHub Releases API 单次上传也存在网络中断风险,
因此本仓库将 EXE 切成 4 个 21 MB 的分卷上传到 GitHub Releases。

## 元信息

- **原始文件**: UIH_AI_Base_PI-v1.0.0.exe
- **原始大小**: 86797824 bytes (~82.78 MB)
- **原始 SHA-256**: `97DA2DC2EDD66D67D4009FE12F6636B8E29D79FFA26AD7B762FFA5B35E83AA97`
- **下载**: https://github.com/bingjian999/uih-ExcelV1/releases/tag/v1.0.0

## 分卷清单

- UIH_AI_Base_PI-v1.0.0.exe.7z.{0:D3}  (21699456 bytes)  SHA-256: `f1e69bc7fc3bbf50b66c0010a1f85da02eb4aa8a1f3ebf00be4623101c38b72a`
- UIH_AI_Base_PI-v1.0.0.exe.7z.{0:D3}  (21699456 bytes)  SHA-256: `ee6f6f96438113189b915b6f15187572c8fd641d0a287f08a8531255c400489b`
- UIH_AI_Base_PI-v1.0.0.exe.7z.{0:D3}  (21699456 bytes)  SHA-256: `011163cf319542779a41304defa0c60fc8814da259ec31107c05f2594c16341d`
- UIH_AI_Base_PI-v1.0.0.exe.7z.{0:D3}  (21699456 bytes)  SHA-256: `46f9a4327a9e939edfd1ec35eb69395eb34ee8c06a4c7d065f5dcc3f85ab7091`


## Windows 恢复命令 (PowerShell)

```powershell
$dest = "C:\Users\bingjian.wang\Downloads\UIH_AI_Base_PI-v1.0.0.exe"
$base = "https://github.com/bingjian999/uih-ExcelV1/releases/download/v1.0.0/UIH_AI_Base_PI-v1.0.0.exe.7z."

# 下载 4 个分卷
for ($i = 1; $i -le 4; $i++) {
  $part = $base + ($i).ToString('D3')
  Write-Host "Downloading $part..."
  Invoke-WebRequest -Uri $part -OutFile "$env:TEMP\part$($i).bin"
}

# 合并
$out = New-Object System.IO.FileStream($dest, [System.IO.FileMode]::Create)
for ($i = 1; $i -le 4; $i++) {
  $in = [System.IO.File]::OpenRead("C:\Users\BINGJI~1.WAN\AppData\Local\Temp\part$($i).bin")
  $in.CopyTo($out)
  $in.Close()
}
$out.Close()

# 校验 SHA-256
$expected = "97DA2DC2EDD66D67D4009FE12F6636B8E29D79FFA26AD7B762FFA5B35E83AA97"
$actual = (Get-FileHash $dest -Algorithm SHA256).Hash
if ($expected -eq $actual) { Write-Host "✓ SHA-256 OK" } else { Write-Host "✗ SHA-256 MISMATCH" -ForegroundColor Red }

# 清理
Remove-Item "C:\Users\BINGJI~1.WAN\AppData\Local\Temp\part*.bin"
```

## Linux / macOS 恢复命令 (curl + cat)

```bash
BASE="https://github.com/bingjian999/uih-ExcelV1/releases/download/v1.0.0/UIH_AI_Base_PI-v1.0.0.exe.7z"
curl -fL "\.001" -o part1.bin
curl -fL "\.002" -o part2.bin
curl -fL "\.003" -o part3.bin
curl -fL "\.004" -o part4.bin
cat part1.bin part2.bin part3.bin part4.bin > UIH_AI_Base_PI-v1.0.0.exe
sha256sum UIH_AI_Base_PI-v1.0.0.exe  # 应等于 97DA2DC2EDD66D67D4009FE12F6636B8E29D79FFA26AD7B762FFA5B35E83AA97
rm part*.bin
```