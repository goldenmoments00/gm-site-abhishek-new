const fs = require('fs');
let c = fs.readFileSync('public/pictlens.html', 'utf8');

const targetRegex = /(@media screen and \(max-width: 991px\) \{\s*\.header-container\.is-header \.space-break \{\s*display: block;\s*flex-basis: 100%;\s*height: 0px;\s*margin-bottom: -8vw;\s*\})/g;

const replacement = `@media screen and (max-width: 991px) {
        .header-container.is-header {
          transform: translateY(-12vh) !important;
        }
        .header-container.is-header .space-break {
          display: block;
          flex-basis: 100%;
          height: 0px;
          margin-bottom: calc(-8vw - 10vh);
        }`;

if (targetRegex.test(c)) {
  c = c.replace(targetRegex, replacement);
  console.log('Applied GOLDEN MOMENT spacing fix.');
} else {
  console.log('Target for GOLDEN MOMENT spacing not found.');
}

fs.writeFileSync('public/pictlens.html', c);
console.log('Done replacing!');
