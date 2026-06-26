Add-Type -AssemblyName System.Drawing
$img1 = [System.Drawing.Image]::FromFile('d:\TEZXT\newww abhi\gm-site-abhishek-main\public\webflow\pictlens\images\68122d5f825f57e2097a141f_Shoe_and_Flower_Contrast.jpg')
Write-Host "Image 1: $($img1.Width)x$($img1.Height)"
$img1.Dispose()

$img2 = [System.Drawing.Image]::FromFile('d:\TEZXT\newww abhi\gm-site-abhishek-main\public\webflow\pictlens\images\6817c5a16eb952859465e932_Vibrant_Sneaker_with_Flowers.jpg')
Write-Host "Image 2: $($img2.Width)x$($img2.Height)"
$img2.Dispose()
