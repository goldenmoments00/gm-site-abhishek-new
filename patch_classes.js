const fs = require('fs');

let c = fs.readFileSync('public/pictlens.html', 'utf8');

// First, remove the custom animation script I injected earlier
const customScriptStart = "    <script>\n      window.addEventListener('DOMContentLoaded', (event) => {\n        setTimeout(() => {\n          document.querySelectorAll('.heading-block').forEach((el, index) => {\n            el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';";
if (c.includes(customScriptStart)) {
    // find the end of the script
    const scriptEnd = "      });\n    </script>\n";
    const endIdx = c.indexOf(scriptEnd, c.indexOf(customScriptStart)) + scriptEnd.length;
    c = c.substring(0, c.indexOf(customScriptStart)) + c.substring(endIdx);
    console.log("Removed custom animation script.");
} else {
    // Try regex removal
    c = c.replace(/<script>\s*window\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>\s*/, '');
    console.log("Regex removed custom animation script.");
}

// Now replace _09, _10, _11, _12 with _01, _02, _03, _04
// We will do global replacements for these classes.
c = c.replace(/heading-block _09/g, 'heading-block _01');
c = c.replace(/heading-block _10/g, 'heading-block _02');
c = c.replace(/heading-block _11/g, 'heading-block _03');
c = c.replace(/heading-block _12/g, 'heading-block _04');

c = c.replace(/heading-item _09/g, 'heading-item _01');
c = c.replace(/heading-item _10/g, 'heading-item _02');
c = c.replace(/heading-item _11/g, 'heading-item _03');
c = c.replace(/heading-item _12/g, 'heading-item _04');

fs.writeFileSync('public/pictlens.html', c, 'utf8');
console.log("Done updating classes to reuse Webflow IX2 animations!");
