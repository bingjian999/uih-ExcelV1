// Generate UIH icons for the Excel add-in
// Creates icon-16.png, icon-32.png, icon-80.png, icon-128.png with "UIH" text
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const distAssets = path.join(__dirname, "dist", "assets");
const sizes = [16, 32, 80, 128];

// Use PowerShell + System.Drawing to generate icons
const psScript = `
Add-Type -AssemblyName System.Drawing
$sizes = @(16, 32, 80, 128)
$dir = '${distAssets.replace(/\\/g, "\\\\")}'
foreach ($size in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias
    
    # Background: teal gradient (matching the app theme #0d9488)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(13, 148, 136))
    $g.FillRectangle($brush, 0, 0, $size, $size)
    
    # Text: "UIH" in white, bold
    $fontSize = [int]($size * 0.42)
    $font = New-Object System.Drawing.Font('Arial', $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    
    # Center the text
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
    $rect = New-Object System.Drawing.RectangleF(0, 0, $size, $size)
    $g.DrawString('UIH', $font, $textBrush, $rect, $sf)
    
    $g.Dispose()
    $outPath = Join-Path $dir "icon-$size.png"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Generated: $outPath ($size x $size)"
}
Write-Output 'DONE'
`;

const tmpScript = path.join(__dirname, "gen-icons.ps1");
fs.writeFileSync(tmpScript, psScript, "utf8");

try {
    const result = execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${tmpScript}"`, {
        encoding: "utf8",
        timeout: 15000,
    });
    console.log(result.trim());
} catch (e) {
    console.error("Failed to generate icons:", e.stderr || e.message);
    process.exit(1);
} finally {
    try { fs.unlinkSync(tmpScript); } catch {}
}
