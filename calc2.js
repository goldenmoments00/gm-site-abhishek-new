const fs = require('fs');
const svg = fs.readFileSync('public/india-states-styled.svg', 'utf8');
const lines = svg.split('\n');
lines.forEach(line => {
  if (line.includes('fill="rgba(217,4,41,0.15)"')) {
    const idMatch = line.match(/id="([^"]+)"/);
    if (idMatch) {
      console.log(idMatch[1]);
    }
  }
});
