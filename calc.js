const d3 = require('d3-geo');
const proj = d3.geoMercator().center([82.5, 23.5]).scale(1000).translate([400, 400]);
const locs = {
  Odisha: [85.8, 20.3],
  Telangana: [78.5, 17.4]
};
for(const [k, v] of Object.entries(locs)) {
  const [x, y] = proj(v);
  console.log(`${k}: top: ${(y/800*100).toFixed(1)}%, left: ${(x/800*100).toFixed(1)}%`);
}
