const fs = require('fs');
let c = fs.readFileSync('public/pictlens.html', 'utf8');

// 1. Fix mobile hero image and remove image-set
const mobileHeroStartStr = '@media screen and (max-width: 991px) {\r\n        .section-home-header {';
let idx1 = c.indexOf(mobileHeroStartStr);
if (idx1 === -1) {
  idx1 = c.indexOf('@media screen and (max-width: 991px) {\n        .section-home-header {');
}
if(idx1 !== -1) {
  let idx2 = c.indexOf('}', idx1 + 70);
  if(idx2 !== -1) {
    let before = c.substring(0, idx1);
    let after = c.substring(idx2);
    let newBlock = `@media screen and (max-width: 991px) {
        .section-home-header {
          background-image: url("/hero-mobile.jpg");
          background-position: top center !important;
          min-height: 100vh;`;
    c = before + newBlock + after;
  }
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
          transform: translateY(8vh) !important;
        }
        .header-container.is-header .space-break {
          display: block;
          flex-basis: 100%;
          height: 10px;
          margin-bottom: -8vh;`;
    c = before + newBlock + after;
  }
}

// 4. Strip inline opacity:0 and transform from _06a, _09, _10, _11, _12
const stripInlineStyles = (html, className) => {
    const regex = new RegExp(`(<div[^>]*?)style="\\s*opacity:\\s*0;\\s*-webkit-transform:[^"]*?transform-style:\\s*preserve-3d;\\s*"([^>]*?class="heading-block ${className}"[^>]*?>)`, 'gs');
    return html.replace(regex, '$1$2');
};

c = stripInlineStyles(c, '_06a');
c = stripInlineStyles(c, '_09');
c = stripInlineStyles(c, '_10');
c = c.replace(/(<div[^>]*?)style="[^"]*?filter:\s*blur\(5px\)[^"]*?"([^>]*?class="heading-item _09"[^>]*?>)/g, '$1$2');
c = c.replace(/(<div[^>]*?)style="[^"]*?filter:\s*blur\(5px\)[^"]*?"([^>]*?class="heading-item _10"[^>]*?>)/g, '$1$2');
// Also _11 and _12
c = stripInlineStyles(c, '_11');
c = stripInlineStyles(c, '_12');
c = c.replace(/(<div[^>]*?)style="[^"]*?filter:\s*blur\(5px\)[^"]*?"([^>]*?class="heading-item _11"[^>]*?>)/g, '$1$2');
c = c.replace(/(<div[^>]*?)style="[^"]*?filter:\s*blur\(5px\)[^"]*?"([^>]*?class="heading-item _12"[^>]*?>)/g, '$1$2');

// 5. Inject CSS animation at the end of <head>
const cssAnimation = `
<style>
@keyframes customWebflowFade {
  0% {
    opacity: 0;
    transform: translate3d(-50%, 0, 0) scale3d(0, 0, 1) rotateX(0) rotateY(225deg) rotateZ(0) skew(0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
  }
}
@keyframes customWebflowBlur {
  0% { filter: blur(5px); }
  100% { filter: blur(0px); }
}

.heading-block._06a { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both; }
.heading-block._09 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.45s both; }
.heading-block._10 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s both; }
.heading-block._11 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.55s both; }
.heading-block._12 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s both; }

.heading-item._09 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.45s both; }
.heading-item._10 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s both; }
.heading-item._11 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.55s both; }
.heading-item._12 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s both; }
</style>
</head>`;

c = c.replace('</head>', cssAnimation);

fs.writeFileSync('public/pictlens.html', c, 'utf8');
console.log("Applied final robust patch.");
