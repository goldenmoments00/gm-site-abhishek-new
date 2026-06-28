const fs = require('fs');
let html = fs.readFileSync('public/pictlens.html', 'utf8');
const urls = [
  "https://res.cloudinary.com/ddp2ewmc2/image/upload/v1782583803/goldenmoment.in_Portfolio_7_of_7_o4bwds.jpg",
  "https://res.cloudinary.com/ddp2ewmc2/image/upload/v1782582883/goldenmoment.in_wed_56_of_58_j8sb8i.jpg",
  "https://res.cloudinary.com/ddp2ewmc2/image/upload/v1782582836/goldenmoment.in_wed_2_of_58_hfxcxw.jpg",
  "https://res.cloudinary.com/ddp2ewmc2/image/upload/v1782583430/goldenmoment.in_mat_11_of_19_lbfmnj.jpg",
  "https://res.cloudinary.com/ddp2ewmc2/image/upload/v1782583712/goldenmoment.in_pre_wedding_4_of_30_q7etzj.jpg"
];
const sectionStart = html.indexOf('<section class="call-to-action">');
const sectionEnd = html.indexOf('</section>', sectionStart);
let sectionHtml = html.substring(sectionStart, sectionEnd);
let urlIndex = 0;
sectionHtml = sectionHtml.replace(/<img[^>]+alternate-image[^>]+>/g, (match) => {
    const newUrl = urls[urlIndex % urls.length];
    urlIndex++;
    let updatedMatch = match.replace(/src="[^"]+"/, `src="${newUrl}"`);
    updatedMatch = updatedMatch.replace(/srcset="[^"]+"/, `srcset="${newUrl} 500w, ${newUrl} 800w, ${newUrl} 920w"`);
    return updatedMatch;
});
html = html.substring(0, sectionStart) + sectionHtml + html.substring(sectionEnd);
fs.writeFileSync('public/pictlens.html', html, 'utf8');
console.log("Replaced images successfully. Total images modified: " + urlIndex);

