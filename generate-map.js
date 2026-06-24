const fs = require('fs');
const d3 = require('d3-geo');

const geojson = JSON.parse(fs.readFileSync('public/india-states-simple.json', 'utf8'));

// Create a projection for India
// Standard Mercator centered on India's coordinates
const projection = d3.geoMercator()
  .center([82.5, 23.5]) // Longitude and Latitude of India's center
  .scale(1000)
  .translate([400, 400]);

const path = d3.geoPath().projection(projection);

let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">\n`;
svg += `<defs>\n`;
svg += `  <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">\n`;
svg += `    <feDropShadow dx="2" dy="5" stdDeviation="5" flood-opacity="0.15" />\n`;
svg += `  </filter>\n`;
svg += `</defs>\n`;
svg += `<g filter="url(#drop-shadow)">\n`;

geojson.features.forEach(feature => {
  const stateName = feature.properties.NAME_1 || feature.properties.st_nm || "Unknown";
  
  // Remove Andaman and Lakshadweep islands from the map
  if (stateName.includes("Andaman") || stateName.includes("Lakshadweep")) {
    return;
  }

  let d = path(feature);
  
  // Strip out the massive bounding box artifact caused by winding order (ZM2101.696...)
  if (d) {
    d = d.replace(/ZM2101\.696.*?Z/g, 'Z');
  }
  
  // Check if state is covered (Added Orissa and Andhra Pradesh to match dataset names)
  const coveredStates = ["Tripura", "Assam", "Meghalaya", "West Bengal", "Bihar", "Delhi", "NCT of Delhi", "Haryana", "Orissa", "Andhra Pradesh"];
  const isCovered = coveredStates.some(s => stateName.includes(s));
  
  const fillColor = isCovered ? "rgba(217,4,41,0.15)" : "#fff6e5";

  // Base color is page cream. Stroke is red as requested but lighter.
  svg += `  <path d="${d}" id="${stateName.replace(/\s+/g, '-')}" class="india-state" fill="${fillColor}" stroke="#D90429" stroke-opacity="0.3" stroke-width="1.2" />\n`;
});

svg += `</g>\n</svg>`;

// Also remove any other trailing artifacts just in case
svg = svg.replace(/ZM[^Z]*?4181[^Z]*?Z/g, 'Z');

fs.writeFileSync('public/india-states-styled.svg', svg);
console.log('SVG Map generated successfully!');
