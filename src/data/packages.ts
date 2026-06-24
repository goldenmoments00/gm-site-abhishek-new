/**
 * Single source of truth for every celebration type and its packages.
 * Consumed by the packages page (showcase, comparison, sticky bar).
 */

export type SpecKey =
  | "coverage"
  | "photos"
  | "video"
  | "album"
  | "team"
  | "shoot"
  | "extras";

export interface SpecRow {
  key: SpecKey;
  label: string;
}

export const SPEC_ROWS: SpecRow[] = [
  { key: "coverage", label: "Coverage" },
  { key: "photos", label: "Photos delivered" },
  { key: "video", label: "Video style" },
  { key: "album", label: "Albums" },
  { key: "team", label: "Crew" },
  { key: "shoot", label: "Photoshoot days" },
  { key: "extras", label: "Highlight & extras" },
];

export interface PackageAddOn {
  name: string;
  price: number;
}

export interface CelebrationPackage {
  id: string;
  name: string;
  tag: string;
  price: number;
  blurb: string;
  popular?: boolean;
  specs: Record<SpecKey, string | null>;
  details: string[];
  addOns?: PackageAddOn[];
}

export interface Celebration {
  id: string;
  name: string;
  lead: string;
  quote: string;
  image: string;
  packages: CelebrationPackage[];
}

export const formatINR = (value: number): string =>
  `₹${value.toLocaleString("en-IN")}`;

export const CELEBRATIONS: Celebration[] = [
  {
    id: "wedding",
    name: "Wedding",
    lead: "Where forever begins",
    quote: "Two families, one story — filmed from both sides.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop",
    packages: [
      {
        id: "vivah",
        name: "VIVAH",
        tag: "Both sides · Essential",
        price: 94999,
        blurb: "Both sides covered, beautifully and completely.",
        specs: {
          coverage: "Full Event",
          photos: "Complete coverage",
          video: "Semi-Cinematic",
          album: '2 Albums · 40 Pages 12"×18" High Glossy',
          team: "1 photographer",
          shoot: "1 Day Pre-Wedding (1 Theme, 1 Location)",
          extras: "1 Pen Drive",
        },
        details: [
          '2 Albums, 20 Sheets / 40 Pages each (12" × 18")',
          'High Glossy Finish (Paper Cover)',
          '1-Day Pre-Wedding Photo Shoot Coverage (One Theme • One Location)',
          '1 Mixed Full Event Semi-Cinematic (Traditional Type) Video',
          'Full Event Photography',
          '1 Pen Drive',
        ],
      },
      {
        id: "bandhan",
        name: "BANDHAN",
        tag: "Both sides · Enhanced",
        price: 119999,
        blurb: "Two full days of shoots, both sides in rich HD.",
        specs: {
          coverage: "Full Event",
          photos: "Complete coverage",
          video: "Cinematic (1-2 Hr)",
          album: '2 Albums · 40 Pages 12"×18" High Glossy',
          team: "1 photographer",
          shoot: "1 Day Pre-Wedding (1 Theme, 1 Location)",
          extras: "Reels & Highlight Video",
        },
        details: [
          '2 Albums, 20 Sheets / 40 Pages each (12" × 18"), High Glossy Finish (Paper Cover)',
          '1-Day Pre-Wedding Photo Shoot Coverage (One Theme • One Location)',
          '1 Pre-Wedding Reel (Basic)',
          '1 Mixed Full Event Cinematic Video (1–2 Hr)',
          '1 Highlight Video or 2 Reels (From Events)',
          'Full Event Photography',
          '1 Pen Drive',
        ],
      },
      {
        id: "saubhagya",
        name: "SAUBHAGYA",
        tag: "Both sides · Premium cinematic",
        price: 139999,
        blurb: "Our most loved collection — cinema from every angle.",
        specs: {
          coverage: "Full Event",
          photos: "Complete & Colour Graded",
          video: "Cinematic (45 Min - 1 Hr)",
          album: '2 Albums · 50 Pages 12"×18" NTR Glossy',
          team: "2 Photographers & Videography Team",
          shoot: "2-Day Pre/Post Shoot + Video",
          extras: "E-Invite, 3 Reels, Highlight",
        },
        details: [
          '2 Albums, 25 Sheets / 50 Pages each (12" × 18"), NTR Glossy (Glass Cover)',
          '2-Day Pre/Post-Wedding Photo Shoot Coverage (One Theme • One Location)',
          '1-Day Pre-Wedding Video',
          '1 Mixed Full Event Wedding Film, Cinematic (45 Min – 1 Hr)',
          '1 Cinematic Highlight Video',
          '3 Reels (From Events)',
          'Full Event Photography',
          'All Colour Graded Photos',
          '1 E-Invitation',
          '2 Pen Drives',
        ],
      },
      {
        id: "mangalam",
        name: "MANGALAM",
        tag: "Both sides · Luxury",
        price: 179999,
        blurb: "The full luxury experience, retouched to perfection.",
        specs: {
          coverage: "Full Event",
          photos: "Complete & Colour Graded + 100 Retouched",
          video: "Cinematic (Storytelling)",
          album: '2 Premium Albums · 70 Pages 12"×18" Feather/NTR',
          team: "Premium Photography & Videography Team",
          shoot: "3-Day Pre + 1-Day Post Shoot",
          extras: "Documentary, E-Invite, 5 Reels",
        },
        details: [
          '2 Premium Albums, 35 Sheet / 70 Page each (12" × 18"), Feather Touch / NTR Glossy, Glass Cover+Box',
          '3-Day Pre-Wedding Photo Shoot Coverage (One Theme • One Location)',
          '2-Day Pre-Wedding Video',
          '1 Mixed Full Event Wedding Film (Storytelling Style), Cinematic (45 Min – 1 Hr)',
          '1 Cinematic Highlight Video (Storytelling)',
          '5 Reels (From Events)',
          'Full Event Photography',
          'All Colour Graded Photos',
          '100 Retouched Photos',
          '1 E-Invitation',
          'Couple Documentary Interview',
          '1-Day Outdoor Post-Wedding Photo Shoot Coverage (One Theme • One Location)',
          '2 Pen Drives',
        ],
      },
    ],
  },
  {
    id: "anniversary",
    name: "Anniversary",
    lead: "Every year, a new chapter",
    quote: "Celebrate the love that keeps on growing.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    packages: [
      {
        id: "smriti",
        name: "SMRITI",
        tag: "Traditional coverage",
        price: 14000,
        blurb: "A warm, traditional record of the whole celebration.",
        specs: {
          coverage: "1 Day",
          photos: "Complete coverage",
          video: "Traditional HD",
          album: "Optional add-on",
          team: "1 Photographer & Videographer",
          shoot: null,
          extras: null,
        },
        details: [
          "1 Day Event Coverage",
          "Complete Event Photography",
          "Full Event Coverage in Traditional HD Video",
        ],
        addOns: [
          { name: '1 Album – 20 Pages, (12"x18")(High-Glossy Finish)', price: 2500 },
        ],
      },
      {
        id: "samparan",
        name: "SAMPARAN",
        tag: "Complete package",
        price: 24000,
        popular: true,
        blurb: "Cinematic film, outdoor shoot and a premium album.",
        specs: {
          coverage: "Full day",
          photos: "Complete coverage",
          video: "Cinematic",
          album: '1 premium album · 20 pages 12"×18" NTR finish',
          team: "1 photographer",
          shoot: "1 day outdoor shoot",
          extras: "Highlight film (3–5 min)",
        },
        details: [
          "1 day coverage",
          "Complete event photography",
          "1-day outdoor photoshoot",
          "1 cinematic full event video",
          "1 cinematic highlight video (3–5 min)",
          '1 premium album · 20 pages 12"×18" (NTR finish)',
        ],
        addOns: [
          { name: "1-day outdoor cinematic video (3–5 min)", price: 8000 },
        ],
      },
    ],
  },
  {
    id: "engagement",
    name: "Engagement",
    lead: "The beginning of forever",
    quote: "The yes before the vows, captured for keeps.",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop",
    packages: [
      {
        id: "sangam",
        name: "SANGAM",
        tag: "Complete coverage",
        price: 15000,
        popular: true,
        blurb: "The whole engagement, filmed cinematically.",
        specs: {
          coverage: "Full day",
          photos: "Complete coverage",
          video: "Cinematic",
          album: "Optional add-on",
          team: "1 photographer",
          shoot: null,
          extras: null,
        },
        details: [
          "1 day event coverage",
          "Complete event photography",
          "Full event coverage in cinematic video",
        ],
        addOns: [
          { name: "1 album · 20 pages (high glossy finish)", price: 2500 },
        ],
      },
    ],
  },
  {
    id: "rice-ceremony",
    name: "Rice Ceremony",
    lead: "Sweet beginnings",
    quote: "Little hands, first tastes, lifelong memories.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop",
    packages: [
      {
        id: "annapushpa",
        name: "ANNAPUSHPA",
        tag: "Complete coverage",
        price: 14000,
        blurb: "The full ceremony plus an outdoor shoot and album.",
        specs: {
          coverage: "Full day",
          photos: "Complete coverage",
          video: "Traditional HD",
          album: '1 album · 20 pages 12"×18" high glossy',
          team: "1 photographer",
          shoot: "1 day outdoor shoot",
          extras: null,
        },
        details: [
          "1 full day event coverage",
          "Complete event photography",
          "1-day outdoor photography",
          '1 album · 20 pages 12"×18" (high glossy finish)',
          "Full event coverage in traditional HD video",
        ],
      },
      {
        id: "annotsav",
        name: "ANNOTSAV",
        tag: "Premium package",
        price: 18000,
        blurb: "A premium album upgrade on the complete coverage.",
        specs: {
          coverage: "Half / full day",
          photos: "Complete coverage",
          video: "Traditional HD",
          album: '1 premium album · 25 pages 12"×18" NTR glossy',
          team: "1 photographer",
          shoot: "1 day outdoor shoot",
          extras: null,
        },
        details: [
          "Half/full day event coverage",
          "Complete event photography",
          "1-day outdoor photography",
          '1 premium album · 25 pages 12"×18" (NTR glossy finish)',
          "Full event coverage in traditional HD video",
        ],
      },
      {
        id: "annasanskar",
        name: "ANNASANSKAR",
        tag: "Premium with highlights",
        price: 24000,
        popular: true,
        blurb: "Cinematic film with a highlight cut of the big day.",
        specs: {
          coverage: "Half / full day",
          photos: "Complete coverage",
          video: "Cinematic",
          album: '1 premium album · 30 pages 12"×18" NTR finish',
          team: "1 photographer",
          shoot: "1 day outdoor shoot",
          extras: "Highlight film (3–5 min)",
        },
        details: [
          "Half/full day event coverage",
          "Complete event photography",
          "1-day outdoor photography",
          '1 premium album · 30 pages 12"×18" (NTR finish)',
          "Full event coverage in cinematic video",
          "1 highlight video (3–5 minutes)",
        ],
      },
    ],
  },
];

export const BOOKING_URL = "https://booking.goldenmoment.in/";

export const priceFrom = (celebration: Celebration): number =>
  Math.min(...celebration.packages.map((p) => p.price));

export const totalPackages = (): number =>
  CELEBRATIONS.reduce((sum, c) => sum + c.packages.length, 0);
