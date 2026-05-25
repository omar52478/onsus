$files = Get-ChildItem -Path "f:\My Portfolio\E-Commerce\onsus-package\onsus-package\onsus-reactjs\src\pages" -Recurse -Filter "*.jsx"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match 'title:\s*"(.*) \|\| Onsus - Multipurpose Reactjs eCommerce Template"') {
        $newContent = $content -replace 'title:\s*"(.*) \|\| Onsus - Multipurpose Reactjs eCommerce Template"', 'title: "Onsus | $1"'
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Updated $($file.Name)"
    }
}
