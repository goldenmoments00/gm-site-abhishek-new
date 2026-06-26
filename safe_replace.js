const fs = require('fs');
let html = fs.readFileSync('d:/TEZXT/newww abhi/gm-site-abhishek-main/public/pictlens.html', 'utf8');

// fix overflow
html = html.replace('<body class="body">', '<body class="body" style="overflow-x: hidden;">');

// replace Klyne with Wedding
html = html.replace(/>Klyne</g, '>Wedding<');
html = html.replace(/68122dbf6512feac6296035f_Dynamic%20Fashion%20Portrait/g, 'Wedding');
html = html.replace(/68122dbf6512feac6296035f_Dynamic_Fashion_Portrait/g, 'Wedding');
html = html.replace(/68161307e9080f73e7a3bf5b_Dynamic_Fashion_Portrait/g, 'Wedding');
html = html.replace(/68161307e9080f73e7a3bf5b_Dynamic%20Fashion%20Portrait/g, 'Wedding');

// replace Vexla with Portfolio
html = html.replace(/>Vexla</g, '>Portfolio<');
html = html.replace(/68122d5f825f57e2097a141f_Shoe_and_Flower_Contrast/g, 'Portfolio');
html = html.replace(/68122d5f825f57e2097a141f_Shoe%20and%20Flower_Contrast/g, 'Portfolio');
html = html.replace(/68122d5f825f57e2097a141f_Shoe%20and%20Flower%20Contrast/g, 'Portfolio');
html = html.replace(/6817c5a16eb952859465e932_Vibrant_Sneaker_with_Flowers/g, 'Portfolio');
html = html.replace(/6817c5a16eb952859465e932_Vibrant%20Sneaker%20with_Flowers/g, 'Portfolio');
html = html.replace(/6817c5a16eb952859465e932_Vibrant%20Sneaker%20with%20Flowers/g, 'Portfolio');

// replace Sarah Carter with Pre Wedding
html = html.replace(/>Sarah Carter</g, '>Pre Wedding<');
html = html.replace(/68122d2dbb6c6698b3b56abe_Portrait_of_a_Young_Woman/g, 'Pre Wedding');
html = html.replace(/68122d2dbb6c6698b3b56abe_Portrait%20of%20a%20Young%20Woman/g, 'Pre Wedding');
html = html.replace(/681615b2bdccb0a0daf6e6a7_Portrait_of_a_Young_Woman_3/g, 'Pre Wedding');
html = html.replace(/681615b2bdccb0a0daf6e6a7_Portrait%20of%20a%20Young%20Woman%203/g, 'Pre Wedding');

fs.writeFileSync('d:/TEZXT/newww abhi/gm-site-abhishek-main/public/pictlens.html', html);
