const fs = require('fs');
let html = fs.readFileSync('d:/TEZXT/newww abhi/gm-site-abhishek-main/public/pictlens.html', 'utf8');

// Replace the data-w-id of the portfolio-content-wrapper so webflow ignores it
html = html.replace('data-w-id="7e7c4be2-8c0d-5793-1c7f-6c4eb0b5b609"', 'id="custom-portfolio-wrapper"');

// Inject the custom CSS and JS right before </body>
const customCode = `
  <style>
    /* Make the wrapper tall enough for 4 items (400vh instead of 300vh) */
    #custom-portfolio-wrapper {
      height: 400vh !important;
    }
    
    /* Make all right-side images stacked and absolute */
    .portfolio-component._01 { z-index: 1; }
    .portfolio-component._02 { z-index: 2; position: absolute; left: auto; right: 0; width: 0%; overflow: hidden; }
    .portfolio-component._03 { z-index: 3; position: absolute; left: auto; right: 0; width: 0%; overflow: hidden; }
    .portfolio-component._04 { z-index: 4; position: absolute; left: auto; right: 0; width: 0%; overflow: hidden; height: 100vh; top: 0; }
    
    /* Ensure the inner image wrappers don't squash */
    .portfolio-component .collection-wrapper { width: 100vw; position: absolute; right: 0; }
  </style>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const wrapper = document.getElementById("custom-portfolio-wrapper");
      if (!wrapper) return;
      
      const leftBlock = wrapper.querySelector('.left-portfolio-block');
      const comp2 = wrapper.querySelector('.portfolio-component._02');
      const comp3 = wrapper.querySelector('.portfolio-component._03');
      const comp4 = wrapper.querySelector('.portfolio-component._04');
      
      // We need to keep the inner content full width (100vw) so it crops from left to right instead of squashing
      const rightWrapper = wrapper.querySelector('.right-portfolio-content');
      if (rightWrapper && window.innerWidth > 991) {
        // Find all collection-wrapper in 2, 3, 4
        [comp2, comp3, comp4].forEach(c => {
          if (c) {
             const cw = c.querySelector('.collection-wrapper');
             if (cw) {
                // To keep it cropping perfectly, it needs to be half the screen width if it's 50% split.
                // Wait, Webflow's CSS for .portfolio-component is width: 100%. 
                cw.style.width = '50vw'; // Right side is 50vw wide
             }
          }
        });
      }

      window.addEventListener('scroll', () => {
        const rect = wrapper.getBoundingClientRect();
        const startOffset = window.innerHeight; // When the top hits the top of screen
        
        // Progress goes from 0 to 1 over 300vh of scrolling (since total height is 400vh, the scroll distance is 300vh)
        let progress = -rect.top / (rect.height - window.innerHeight);
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        
        // Left side text translation (4 items = move up 75%)
        if (leftBlock) {
          leftBlock.style.transform = \`translate3d(0px, \${-75 * progress}%, 0px)\`;
        }
        
        // Right side reveals
        // item 2 reveals from progress 0 to 0.333
        if (comp2) {
          let p2 = Math.min(1, Math.max(0, progress * 3));
          comp2.style.width = (p2 * 100) + '%';
        }
        
        // item 3 reveals from progress 0.333 to 0.666
        if (comp3) {
          let p3 = Math.min(1, Math.max(0, (progress - 0.3333) * 3));
          comp3.style.width = (p3 * 100) + '%';
        }
        
        // item 4 reveals from progress 0.666 to 1.0
        if (comp4) {
          let p4 = Math.min(1, Math.max(0, (progress - 0.6666) * 3));
          comp4.style.width = (p4 * 100) + '%';
        }
      }, { passive: true });
    });
  </script>
`;

html = html.replace('</body>', customCode + '\n</body>');
fs.writeFileSync('d:/TEZXT/newww abhi/gm-site-abhishek-main/public/pictlens.html', html);
console.log("Done");
