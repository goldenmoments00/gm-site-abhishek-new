const fs = require('fs');

let c = fs.readFileSync('public/pictlens.html', 'utf8');

// 1. Fix mobile hero image and remove image-set
const mobileHeroStartStr = '@media screen and (max-width: 991px) {\r\n        .section-home-header {';
let idx1 = c.indexOf(mobileHeroStartStr);
if (idx1 === -1) {
  // Try with \n instead of \r\n
  idx1 = c.indexOf('@media screen and (max-width: 991px) {\n        .section-home-header {');
}
if(idx1 !== -1) {
  let idx2 = c.indexOf('}', idx1 + 70); // skip the opening bracket of section-home-header
  if(idx2 !== -1) {
    let before = c.substring(0, idx1);
    let after = c.substring(idx2);
    let newBlock = `@media screen and (max-width: 991px) {
        .section-home-header {
          background-image: url("/hero-mobile.jpg");
          background-position: top center !important;
          min-height: 100vh;`;
    c = before + newBlock + after;
    console.log('Mobile hero fixed');
  }
} else {
  console.log('Mobile hero start not found');
}

// 2. Fix desktop hero image
c = c.replace(/\/webflow\/pictlens\/images\/bg-opt\.jpg/g, '/webflow/pictlens/images/gm-hero.jpg');
c = c.replace(/\/webflow\/pictlens\/images\/bg-opt\.webp/g, '/webflow/pictlens/images/gm-hero.jpg');

// 3. Fix GOLDEN MOMENT spacing
let spacingStartStr = '@media screen and (max-width: 991px) {\r\n        .header-container.is-header .space-break {';
let idx3 = c.indexOf(spacingStartStr);
if (idx3 === -1) {
  spacingStartStr = '@media screen and (max-width: 991px) {\n        .header-container.is-header .space-break {';
  idx3 = c.indexOf(spacingStartStr);
}

if(idx3 !== -1) {
  let idx4 = c.indexOf('}', idx3 + spacingStartStr.length);
  if(idx4 !== -1) {
    let before = c.substring(0, idx3);
    let after = c.substring(idx4);
    let newBlock = `@media screen and (max-width: 991px) {
        .header-container.is-header {
          transform: translateY(-16vh) !important;
        }
        .header-container.is-header .space-break {
          display: block;
          flex-basis: 100%;
          height: 10px;
          margin-bottom: -6vh;`;
    c = before + newBlock + after;
    console.log('Spacing fixed');
  }
} else {
  console.log('Spacing start not found');
}

fs.writeFileSync('public/pictlens.html', c);
console.log('Done!');
