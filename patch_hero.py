import sys

with open('public/pictlens.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix desktop hero
content = content.replace('url("/webflow/pictlens/images/bg-opt.jpg")', 'url("/webflow/pictlens/images/gm-hero.jpg")')
content = content.replace('url("/webflow/pictlens/images/bg-opt.webp")', 'url("/webflow/pictlens/images/gm-hero.jpg")')

# Fix mobile hero
target_mobile_hero = """        @media screen and (max-width: 991px) {
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
        }"""

replacement_mobile_hero = """        @media screen and (max-width: 991px) {
          .section-home-header {
            background-image: url("/hero-mobile.jpg");
            background-position: top center !important;
            min-height: 100vh;
          }
        }"""

if target_mobile_hero in content:
    content = content.replace(target_mobile_hero, replacement_mobile_hero)
else:
    print("WARNING: Could not find target_mobile_hero block!")

# Fix GOLDEN MOMENT spacing
target_spacing = """      /* On smaller screens, wrap to two lines */
      @media screen and (max-width: 991px) {
        .header-container.is-header .space-break {
          display: block;
          flex-basis: 100%;
          height: 10px;
        }"""

replacement_spacing = """      /* On smaller screens, wrap to two lines */
      @media screen and (max-width: 991px) {
        .header-container.is-header {
          transform: translateY(-16vh) !important;
        }
        .header-container.is-header .space-break {
          display: block;
          flex-basis: 100%;
          height: 10px;
          margin-bottom: -6vh;
        }"""

if target_spacing in content:
    content = content.replace(target_spacing, replacement_spacing)
else:
    print("WARNING: Could not find target_spacing block!")

with open('public/pictlens.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished applying python patch!")
