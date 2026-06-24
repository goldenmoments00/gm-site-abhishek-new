const fs = require('fs');
let c = fs.readFileSync('public/pictlens.html', 'utf8');

// 1. Fix the dark shadow/gradient on mobile by using top center for background
c = c.replace(
  /background-position: center center;\s*min-height: 100vh;/g,
  'background-position: top center !important;\n            min-height: 100vh;'
);

// 2. Bring GOLDEN down on mobile, without moving MOMENT
const mobileCssTarget = `        @media screen and (max-width: 991px) {
          .header-container.is-header .space-break {
            display: block;
            flex-basis: 100%;
            height: 0px;
            margin-bottom: -8vw;
          }`;

const mobileCssReplacement = `        @media screen and (max-width: 991px) {
          .header-container.is-header {
            transform: translateY(-12vh) !important;
          }
          .header-container.is-header .space-break {
            display: block;
            flex-basis: 100%;
            height: 0px;
            margin-bottom: calc(-8vw - 10vh);
          }`;

if (c.includes(mobileCssTarget)) {
  c = c.replace(mobileCssTarget, mobileCssReplacement);
  console.log('Applied GOLDEN MOMENT spacing fix.');
} else {
  console.log('Target for GOLDEN MOMENT spacing not found.');
}

fs.writeFileSync('public/pictlens.html', c);
console.log('Done replacing!');
