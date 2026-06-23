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