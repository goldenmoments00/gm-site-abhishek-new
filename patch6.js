const fs = require('fs');
let c = fs.readFileSync('public/pictlens.html', 'utf8');

c = c.replace(
  /background-position: center center;\s*min-height: 100vh;/g,
  'background-position: top center !important;\n            min-height: 100vh;'
);

const oldCSS = `      /* On smaller screens, wrap to two lines */
      @media screen and (max-width: 991px) {
        .header-container.is-header .space-break {
          display: block;
          flex-basis: 100%;
          height: 10px;
        }`;

const newCSS = `      /* On smaller screens, wrap to two lines */
      @media screen and (max-width: 991px) {
        .header-container.is-header {
          transform: translateY(-10vh) !important;
        }
        .header-container.is-header .space-break {
          display: block;
          flex-basis: 100%;
          height: 10px;
          margin-bottom: -12vh;
        }`;

if (c.indexOf(oldCSS) !== -1) {
  c = c.replace(oldCSS, newCSS);
  fs.writeFileSync('public/pictlens.html', c);
  console.log('Success!');
} else {
  console.log('Could not find oldCSS in file.');
}
