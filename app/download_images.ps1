# PowerShell script to download images and update component files

# Define the base URLs and paths
$baseUrl = "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-01-28/"
$publicBasePath = "public"
$srcBasePath = "src/component"

# Template folders mapping
$templateFolders = @{
    "tempalate1" = "tempalate1"
    "tempalate2" = "tempalate2"
    "template3" = "template3"
    "template4" = "template4"
    "template5" = "template5"
    "template6" = "template6"
    "template7" = "template7"
    "template8" = "template8"
    "template9" = "template9"
    "template10" = "template10"
    "template11" = "template11"
    "template12" = "template12"
    "template13" = "template13"
    
}

# Create public folders for each template
foreach ($folder in $templateFolders.Values) {
    $publicFolder = Join-Path $publicBasePath $folder
    if (!(Test-Path $publicFolder)) {
        New-Item -ItemType Directory -Path $publicFolder -Force | Out-Null
        Write-Host "Created folder: $publicFolder"
    }
}

# Function to download image
function Download-Image {
    param(
        [string]$url,
        [string]$destinationPath
    )
    
    try {
        if (!(Test-Path $destinationPath)) {
            Write-Host "Downloading: $url"
            Invoke-WebRequest -Uri $url -OutFile $destinationPath -ErrorAction Stop
            Write-Host "Saved to: $destinationPath"
            return $true
        } else {
            Write-Host "File already exists: $destinationPath"
            return $true
        }
    } catch {
        Write-Host "Failed to download: $url - Error: $_"
        return $false
    }
}

# Process each template file
$templateFiles = Get-ChildItem -Path $srcBasePath -Recurse -Filter "Template*.tsx"

foreach ($file in $templateFiles) {
    $templateName = $file.Directory.Name
    $publicFolder = Join-Path $publicBasePath $templateName
    
    Write-Host "`nProcessing: $($file.FullName)"
    
    # Read file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Find all image URLs in the file
    $pattern = 'https://codia-f2c\.s3\.us-west-1\.amazonaws\.com/image/2026-01-28/([a-zA-Z0-9]+\.png)'
    $matches = [regex]::Matches($content, $pattern)
    
    $downloadedImages = @{}
    
    foreach ($match in $matches) {
        $fullUrl = $match.Value
        $imageName = $match.Groups[1].Value
        $localPath = Join-Path $publicFolder $imageName
        
        # Download image if not already downloaded
        if (!$downloadedImages.ContainsKey($imageName)) {
            $success = Download-Image -url $fullUrl -destinationPath $localPath
            if ($success) {
                $downloadedImages[$imageName] = $true
            }
        }
    }
    
    # Update file content with local paths
    $newContent = $content
    foreach ($imageName in $downloadedImages.Keys) {
        $oldUrl = "$baseUrl$imageName"
        $newUrl = "/$templateName/$imageName"
        $newContent = $newContent -replace [regex]::Escape($oldUrl), $newUrl
    }
    
    # Save updated content
    if ($newContent -ne $content) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "`nImage download and update complete!"
