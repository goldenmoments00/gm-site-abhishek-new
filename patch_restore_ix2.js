const fs = require('fs');
let c = fs.readFileSync('public/pictlens.html', 'utf8');

// 1. Re-enable the Webflow data-w-id so IX2 engine handles the animation
c = c.replace(
  'data-disabled-w-id="ffa6ffc5-5b93-b6ae-4e77-061159d99f09"',
  'data-w-id="ffa6ffc5-5b93-b6ae-4e77-061159d99f09"'
);
console.log('Step 1: Re-enabled Webflow IX2 data-w-id');

// 2. The inline styles for opacity:0 + transform were stripped by my earlier patch.
//    Webflow IX2 needs those inline styles as the "initial state" so it can animate FROM them.
//    We need to put them back on letters _01 through _08 (the ones Webflow knows about).

const inlineStyle = `style="
                          opacity: 0;
                          -webkit-transform: translate3d(-50%, 0, 0)
                            scale3d(0, 0, 1) rotateX(0) rotateY(225deg)
                            rotateZ(0) skew(0, 0);
                          -moz-transform: translate3d(-50%, 0, 0)
                            scale3d(0, 0, 1) rotateX(0) rotateY(225deg)
                            rotateZ(0) skew(0, 0);
                          -ms-transform: translate3d(-50%, 0, 0)
                            scale3d(0, 0, 1) rotateX(0) rotateY(225deg)
                            rotateZ(0) skew(0, 0);
                          transform: translate3d(-50%, 0, 0) scale3d(0, 0, 1)
                            rotateX(0) rotateY(225deg) rotateZ(0) skew(0, 0);
                          transform-style: preserve-3d;
                        "`;

const blurStyle = 'style="filter: blur(5px)"';

// Fix letters _01 through _08 in the hero section only
// We target the specific pattern: empty style + class
const classes = ['_01', '_02', '_03', '_04', '_05', '_06', '_07', '_08'];

for (const cls of classes) {
  // Fix heading-block: add back inline style
  // Current pattern: <div\r\n                        \r\n                        class="heading-block _XX"
  // in the is-header container
  const blockPattern = new RegExp(
    `(<div\\s*\\r?\\n\\s*)\\r?\\n(\\s*class="heading-block ${cls}"\\s*\\r?\\n\\s*>\\s*\\r?\\n\\s*<div\\s+)class="heading-item ${cls}"`,
    ''
  );
  
  c = c.replace(blockPattern, `$1${inlineStyle}\n$2${blurStyle} class="heading-item ${cls}"`);
}

console.log('Step 2: Restored inline styles for _01 through _08');

// 3. Remove CSS animation rules for _01 through _08 (let Webflow handle those)
//    Keep CSS animation only for _06a, _09, _10, _11, _12
const linesToRemove = [
  '.header-container.is-header .heading-block._01 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.05s both !important; }',
  '.header-container.is-header .heading-block._02 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both !important; }',
  '.header-container.is-header .heading-block._03 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s both !important; }',
  '.header-container.is-header .heading-block._04 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s both !important; }',
  '.header-container.is-header .heading-block._05 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.25s both !important; }',
  '.header-container.is-header .heading-block._06 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both !important; }',
  '.header-container.is-header .heading-block._07 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s both !important; }',
  '.header-container.is-header .heading-block._08 { animation: customWebflowFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.45s both !important; }',
];

const blurLinesToRemove = [
  '.header-container.is-header .heading-item._01 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.05s both !important; }',
  '.header-container.is-header .heading-item._02 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both !important; }',
  '.header-container.is-header .heading-item._03 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s both !important; }',
  '.header-container.is-header .heading-item._04 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s both !important; }',
  '.header-container.is-header .heading-item._05 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.25s both !important; }',
  '.header-container.is-header .heading-item._06 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both !important; }',
  '.header-container.is-header .heading-item._07 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s both !important; }',
  '.header-container.is-header .heading-item._08 { animation: customWebflowBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.45s both !important; }',
];

for (const line of [...linesToRemove, ...blurLinesToRemove]) {
  c = c.replace(line + '\n', '');
  c = c.replace(line + '\r\n', '');
  c = c.replace(line, '');
}

console.log('Step 3: Removed CSS animations for _01-_08 (Webflow handles those)');

fs.writeFileSync('public/pictlens.html', c, 'utf8');
console.log('Done! Webflow IX2 now handles _01-_08, CSS handles _06a and _09-_12.');
