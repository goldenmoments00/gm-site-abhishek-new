const fs = require('fs');
let content = fs.readFileSync('src/app/about/page.tsx', 'utf-8');

// 1. Fix imports
content = content.replace(
  'import { morganite, nyghtSerif } from "@/lib/fonts";',
  'import { morganite, nyghtSerif, sellendra, lato, specialElite } from "@/lib/fonts";'
);
content = content.replace(
  'import Navbar from "@/components/Navbar";',
  'import PillNavbar from "@/components/PillNavbar";\nimport OurJourney from "@/components/OurJourney";'
);

// 2. Fix PillNavbar usage
content = content.replace('<Navbar />', '<PillNavbar />');
content = content.replace('min-h-[300vh] sm:min-h-[400vh]', 'min-h-[250vh] sm:min-h-[300vh]');

// 3. Rebuild the file structure
const heroStart = content.indexOf('{/* Hero Section - Fully Responsive */}');
const teamShowcaseStart = content.indexOf('{/* Team Showcase Section - Enhanced Responsive & Spacious */}');

if (heroStart !== -1 && teamShowcaseStart !== -1) {
    const newHero = `{/* Hero Section - Fully Responsive */}
        <section className="relative w-full z-20 overflow-visible bg-[#FFF6E5]">
          {/* Hero Image */}
          <div className="w-full">
            <img
              src="/images/about-hero.jpg"
              alt="Our Story"
              className="w-full h-auto block"
            />
          </div>

          {/* Hero Text - Mobile-First Responsive, overlaid on image */}
          <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center justify-start text-center px-4 sm:px-6 lg:px-8 pt-[120px] sm:pt-[150px] pointer-events-none">
            <motion.h1
              className={\`\${morganite.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#FFF6E5] mb-4 sm:mb-6 leading-tight max-w-5xl drop-shadow-lg\`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Our Story
            </motion.h1>
            <motion.p
              className={\`\${nyghtSerif.className} text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#FFF6E5]/90 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl leading-relaxed px-2 drop-shadow-md\`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Four visionaries united by passion, creativity, and the art of
              capturing
              <span className="italic text-[#FFF6E5] font-medium">
                {" "}
                life&apos;s golden moments
              </span>
            </motion.p>
          </div>

          {/* Torn Paper Transition Overlay */}
          <div className="absolute bottom-0 left-0 w-full z-50 translate-y-1/2 pointer-events-none">
            <img
              src="/webflow/pictlens/images/about-header-bg.png"
              alt="torn edge"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Scroll Indicator - Responsive */}
          <motion.div
            className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
              <motion.div
                className="w-0.5 sm:w-1 h-2 sm:h-3 bg-white/80 rounded-full mt-1.5 sm:mt-2 shadow-sm"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Our Journey Section */}
        <OurJourney />

        `;
    content = content.substring(0, heroStart) + newHero + content.substring(teamShowcaseStart);
    fs.writeFileSync('src/app/about/page.tsx', content);
    console.log("Successfully patched page.tsx");
} else {
    console.log("Could not find sections");
}
