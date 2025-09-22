# check-paths.ps1
Write-Host "Checking project path configs..."

# Files to check
$files = @("next.config.js", "tsconfig.json", "package.json")

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "`nChecking $file..."
        $content = Get-Content $file -Raw

        # Look for undefined
        if ($content -match "undefined") {
            Write-Host "  [WARN] Found 'undefined' in file:"
            $matches = ($content | Select-String "undefined" -AllMatches).Matches
            foreach ($m in $matches) {
                Write-Host "    -> $($m.Value)"
            }
        } else {
            Write-Host "  [OK] No 'undefined' found"
        }

        # Look for alias or path.resolve
        if ($content -match "alias" -or $content -match "path.resolve") {
            Write-Host "  [INFO] Found possible alias or path.resolve config"
        }
    } else {
        Write-Host "`n[WARN] File not found: $file"
    }
}

Write-Host "`nDone."
