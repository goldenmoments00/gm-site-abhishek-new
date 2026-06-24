const fs = require('fs');

let content = fs.readFileSync('public/pictlens.html', 'utf8');

// Fix desktop hero
content = content.replace(/url\("\/webflow\/pictlens\/images\/bg-opt\.jpg"\)/g, 'url("/webflow/pictlens/images/gm-hero.jpg")');
content = content.replace(/url\("\/webflow\/pictlens\/images\/bg-opt\.webp"\)/g, 'url("/webflow/pictlens/images/gm-hero.jpg")');

// Fix mobile hero
const targetMobileHero = `        @media screen and (max-width: 991px) {
          .section-home-header {
            background-image: url("/webflow/pictlens/images/bg-mobile-opt.jpg");
            background-image: -webkit-image-set(
              url("/webflow/pictlens/images/bg-mobile-opt.webp")
                type("image/webp"),
              url("/webflow/pictlens/images/bg-mobile-opt.jpg") type("image/jpeg")
            );
            background-image: image-set(
              url("/webflow/pictlens/images/bg-mobile-opt.webp")
                type("image/webp"),
              url("/webflow/pictlens/images/bg-mobile-opt.jpg") type("image/jpeg")
            );
          }
        }`;

const replacementMobileHero = `        @media screen and (max-width: 991px) {
          .section-home-header {
            background-image: url("/hero-mobile.jpg");
            background-position: top center !important;
            min-height: 100vh;
          }
        }`;

if (content.includes(targetMobileHero)) {
    content = content.replace(targetMobileHero, replacementMobileHero);
} else {
    console.log("WARNING: Could not find target_mobile_hero block!");
}

// Fix GOLDEN MOMENT spacing
const targetSpacing = `      /* On smaller screens, wrap to two lines */
      @media screen and (max-width: 991px) {
        .header-container.is-header .space-break {
          display: block;
          flex-basis: 100%;
          height: 10px;
        }`;

const replacementSpacing = `      /* On smaller screens, wrap to two lines */
      @media screen and (max-width: 991px) {
        .header-container.is-header {
          transform: translateY(-16vh) !important;
        }
        .header-container.is-header .space-break {
          display: block;
          flex-basis: 100%;
          height: 10px;
          margin-bottom: -6vh;
        }`;

if (content.includes(targetSpacing)) {
    content = content.replace(targetSpacing, replacementSpacing);
} else {
    console.log("WARNING: Could not find target_spacing block!");
}

fs.writeFileSync('public/pictlens.html', content, 'utf8');
console.log("Finished applying node patch!");
