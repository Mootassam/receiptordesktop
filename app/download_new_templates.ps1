# PowerShell script to download images from Template14 and Template15

# Define the base URLs and paths
$baseUrl = "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-03-30/"
$publicBasePath = "public"
$srcBasePath = "src/component"

# Template folders mapping
$templateFolders = @{
    "template14" = "template14"
    "template15" = "template15"
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

# Process Template14
$template14File = "src/component/template14/Template14.tsx"
if (Test-Path $template14File) {
    Write-Host "`nProcessing: $template14File"
    
    # Read file content
    $content = Get-Content -Path $template14File -Raw
    
    # Find all image URLs in the file
    $pattern = 'https://codia-f2c\.s3\.us-west-1\.amazonaws\.com/image/2026-03-30/([a-zA-Z0-9]+\.png)'
    $matches = [regex]::Matches($content, $pattern)
    
    $downloadedImages = @{}
    
    foreach ($match in $matches) {
        $fullUrl = $match.Value
        $imageName = $match.Groups[1].Value
        $localPath = "$publicBasePath\template14\$imageName"
        
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
        $newUrl = "/template14/$imageName"
        $newContent = $newContent -replace [regex]::Escape($oldUrl), $newUrl
    }
    
    # Save updated content
    if ($newContent -ne $content) {
        Set-Content -Path $template14File -Value $newContent -NoNewline
        Write-Host "Updated: $template14File"
    }
}

# Process Template15
$template15File = "src/component/template15/Template15.tsx"
if (Test-Path $template15File) {
    Write-Host "`nProcessing: $template15File"
    
    # Read file content
    $content = Get-Content -Path $template15File -Raw
    
    # Find all image URLs in the file
    $pattern = 'https://codia-f2c\.s3\.us-west-1\.amazonaws\.com/image/2026-03-30/([a-zA-Z0-9]+\.png)'
    $matches = [regex]::Matches($content, $pattern)
    
    $downloadedImages = @{}
    
    foreach ($match in $matches) {
        $fullUrl = $match.Value
        $imageName = $match.Groups[1].Value
        $localPath = "$publicBasePath\template15\$imageName"
        
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
        $newUrl = "/template15/$imageName"
        $newContent = $newContent -replace [regex]::Escape($oldUrl), $newUrl
    }
    
    # Save updated content
    if ($newContent -ne $content) {
        Set-Content -Path $template15File -Value $newContent -NoNewline
        Write-Host "Updated: $template15File"
    }
}

Write-Host "`nImage download and update complete!"
