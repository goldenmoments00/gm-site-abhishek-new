const fs = require('fs');
let html = fs.readFileSync('d:\\TEZXT\\newww abhi\\gm-site-abhishek-main\\public\\pictlens.html', 'utf8');

let match = html.match(/"id":"a-40-n-23"[\s\S]*?"portfolio-component\._03"[\s\S]*?\]\}\]\}\]/);
if (match) {
    console.log(match[0].substring(0, 1000));
} else {
    console.log("Not found");
}

let allMatches = html.match(/\.portfolio-component\._03/g);
console.log("Occurrences of _03: ", allMatches ? allMatches.length : 0);
