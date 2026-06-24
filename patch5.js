const fs = require('fs');
let c = fs.readFileSync('public/pictlens.html', 'utf8');

c = c.replace(
  /\.header-container\.is-header \.space-break\s*\{\s*display: block;\s*flex-basis: 100%;\s*height: 0px;\s*margin-bottom: -8vw;\s*\}/g,
  `.header-container.is-header { transform: translateY(-12vh) !important; } .header-container.is-header .space-break { display: block; flex-basis: 100%; height: 0px; margin-bottom: calc(-8vw - 10vh); }`
);

// Don't forget to restore the background position gradient fix!
c = c.replace(
  /background-position: center center;\s*min-height: 100vh;/g,
  'background-position: top center !important;\n            min-height: 100vh;'
);

fs.writeFileSync('public/pictlens.html', c);
console.log('Done!');
