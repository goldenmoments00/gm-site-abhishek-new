const fs = require('fs');
let c = fs.readFileSync('public/pictlens.html', 'utf8');

// We will overwrite the previous <style> block I injected.
// Let's find where I injected it.
const styleStart = '<style>\n@keyframes customWebflowFade';
const styleEnd = '</style>\n</head>';

if (c.includes(styleStart)) {
    c = c.substring(0, c.indexOf(styleStart)) + '</head>' + c.substring(c.indexOf(styleEnd) + styleEnd.length);
}

// We also need to strip inline styles from _01 to _08 just in case Webflow is fighting us.
// But actually, it's easier to just use CSS !important.
// Wait, we can't use !important in keyframes easily in all browsers. 
// So let's just strip the inline styles from ALL .heading-block and .heading-item in the hero container.
// We will do a generic replace.

let heroHTML = c.match(/<div class="header-container is-header">.*?<div class="w-layout-grid intro-component-grid">/s)[0];

if (heroHTML) {
    let modifiedHero = heroHTML.replace(/style="\s*opacity:\s*0;\s*-webkit-transform:[^"]*?transform-style:\s*preserve-3d;\s*"/g, '');
    modifiedHero = modifiedHero.replace(/style="[^"]*?filter:\s*blur\(5px\)[^"]*?"/g, '');
    c = c.replace(heroHTML, modifiedHero);
}

const cssAnimationAll = `
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

/* Force override any lingering inline styles after animation finishes */
.header-container.is-header .heading-block {
    opacity: 1 !important;
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0) !important;
}
.header-container.is-header .heading-item {
    filter: blur(0px) !important;
}

.header-container.is-header .heading-block._01 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.05s both !important; }
.header-container.is-header .heading-block._02 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both !important; }
.header-container.is-header .heading-block._03 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s both !important; }
.header-container.is-header .heading-block._04 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s both !important; }
.header-container.is-header .heading-block._05 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.25s both !important; }
.header-container.is-header .heading-block._06 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both !important; }
.header-container.is-header .heading-block._06a { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.35s both !important; }
.header-container.is-header .heading-block._07 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s both !important; }
.header-container.is-header .heading-block._08 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.45s both !important; }
.header-container.is-header .heading-block._09 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s both !important; }
.header-container.is-header .heading-block._10 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.55s both !important; }
.header-container.is-header .heading-block._11 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s both !important; }
.header-container.is-header .heading-block._12 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.65s both !important; }

.header-container.is-header .heading-item._01 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.05s both !important; }
.header-container.is-header .heading-item._02 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both !important; }
.header-container.is-header .heading-item._03 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s both !important; }
.header-container.is-header .heading-item._04 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s both !important; }
.header-container.is-header .heading-item._05 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.25s both !important; }
.header-container.is-header .heading-item._06 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both !important; }
.header-container.is-header .heading-item._06a { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.35s both !important; }
.header-container.is-header .heading-item._07 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s both !important; }
.header-container.is-header .heading-item._08 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.45s both !important; }
.header-container.is-header .heading-item._09 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s both !important; }
.header-container.is-header .heading-item._10 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.55s both !important; }
.header-container.is-header .heading-item._11 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s both !important; }
.header-container.is-header .heading-item._12 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.65s both !important; }

/* Let's prevent Webflow JS from interfering completely by hiding the data-w-id of the container */
</style>
</head>`;

c = c.replace('</head>', cssAnimationAll);

// Remove the data-w-id so Webflow completely ignores this container
c = c.replace('data-w-id="ffa6ffc5-5b93-b6ae-4e77-061159d99f09"', 'data-disabled-w-id="ffa6ffc5-5b93-b6ae-4e77-061159d99f09"');

fs.writeFileSync('public/pictlens.html', c, 'utf8');
console.log("Applied absolute final robust patch for ALL letters.");
