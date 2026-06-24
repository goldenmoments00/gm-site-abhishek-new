const fs = require('fs');
let c = fs.readFileSync('public/pictlens.html', 'utf8');

const targetSpacing = `        .header-container.is-header {
          transform: translateY(-16vh) !important;
        }
        .header-container.is-header .space-break {
          display: block;
          flex-basis: 100%;
          height: 10px;
          margin-bottom: -6vh;`;

const replacementSpacing = `        .header-container.is-header {
          transform: translateY(8vh) !important;
        }
        .header-container.is-header .space-break {
          display: block;
          flex-basis: 100%;
          height: 10px;
          margin-bottom: -8vh;`;

if (c.includes(targetSpacing)) {
  c = c.replace(targetSpacing, replacementSpacing);
  fs.writeFileSync('public/pictlens.html', c, 'utf8');
  console.log('Mobile spacing updated: GOLDEN moved down 8vh, MOMENT kept in place');
} else {
  // Let's try with different line endings
  const targetSpacingCRLF = targetSpacing.replace(/\n/g, '\r\n');
  if (c.includes(targetSpacingCRLF)) {
    c = c.replace(targetSpacingCRLF, replacementSpacing.replace(/\n/g, '\r\n'));
    fs.writeFileSync('public/pictlens.html', c, 'utf8');
    console.log('Mobile spacing updated: GOLDEN moved down 8vh, MOMENT kept in place (CRLF)');
  } else {
    console.log('Could not find target block in HTML');
  }
}
