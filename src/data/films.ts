/**
 * Wedding films (YouTube) and behind-the-lens reels (Instagram).
 *
 * ⚠️ Replace the placeholder `youTubeId` values and Instagram `shortcode`
 * values with real ones. Everything else (titles, captions, layout) is
 * already wired up.
 *
 *  - youTubeId:  the part after `v=` in a YouTube URL, or after `youtu.be/`
 *  - shortcode:  the part after `/reel/` in an Instagram reel URL
 */

export interface Film {
  id: string;
  youTubeId: string;
  couple: string;
  location: string;
  date: string;
  category: "Wedding" | "Pre Wedding";
}

export const FILMS: Film[] = [
  {
    id: "f1",
    youTubeId: "0riNoN2a5xw",
    couple: "Sourav & Debanjana",
    location: "",
    date: "2025",
    category: "Wedding",
  },
  {
    id: "f2",
    youTubeId: "hip988vYOho",
    couple: "Debearghya & Sushmita",
    location: "",
    date: "2024",
    category: "Wedding",
  },
  {
    id: "f3",
    youTubeId: "p-K543CVrnE",
    couple: "Debabrata & Nikita",
    location: "",
    date: "2025",
    category: "Wedding",
  },
  {
    id: "f4",
    youTubeId: "n4qtbxU3avE",
    couple: "Somnath & Ananya",
    location: "Meghalaya",
    date: "2026",
    category: "Pre Wedding",
  },
  {
    id: "f5",
    youTubeId: "9P9IdxKjwuo",
    couple: "Mrigankar & Ambika",
    location: "",
    date: "",
    category: "Pre Wedding",
  },
  {
    id: "f6",
    youTubeId: "Ntc3OMlb5qY",
    couple: "Prasanta & Urbashi",
    location: "",
    date: "2025",
    category: "Pre Wedding",
  },
];

export interface Reel {
  id: string;
  /** Instagram reel shortcode (the part after /reel/). */
  shortcode: string;
  caption: string;
  thumbnail?: string;
  /** Direct link to the raw video file (e.g. .mp4) */
  videoUrl?: string;
}

export const BEHIND_THE_LENS_REELS: Reel[] = [
  { id: "r1", shortcode: "DW86QqPSqWN", caption: "Golden Moment", thumbnail: "/images/reels/reel1.jpg", videoUrl: "/videos/reels/reel1.mp4" },
  { id: "r2", shortcode: "DTvCfWnEjs5", caption: "Golden Moment", thumbnail: "/images/reels/reel2.jpg", videoUrl: "/videos/reels/reel2.mp4" },
  { id: "r3", shortcode: "C8Ss1B2Kcde", caption: "Between takes", thumbnail: "/images/reels/reel3.jpg", videoUrl: "/videos/reels/reel3.mp4" },
  { id: "r4", shortcode: "C8Tt2C3Ldef", caption: "Directing the chaos", thumbnail: "/images/reels/reel4.jpg", videoUrl: "/videos/reels/reel4.mp4" },
  { id: "r5", shortcode: "C8Uu3D4Mefg", caption: "Golden hour run", thumbnail: "/images/reels/reel5.jpg", videoUrl: "/videos/reels/reel5.mp4" },
  { id: "r6", shortcode: "C8Qq9Z0Ixyz", caption: "Candid smiles", thumbnail: "/images/reels/reel6.jpg", videoUrl: "/videos/reels/reel6.mp4" },
  { id: "r7", shortcode: "C8Rr0A1Jvwx", caption: "Drone flights", thumbnail: "/images/reels/reel7.jpg", videoUrl: "/videos/reels/reel7.mp4" },
  { id: "r8", shortcode: "C8Ss1B2Kstu", caption: "The setup" },
  { id: "r9", shortcode: "C8Tt2C3Lpqr", caption: "Night shots" },
  { id: "r10", shortcode: "C8Uu3D4Mmnb", caption: "Wrapping up" },
];

export const youTubeThumb = (id: string): string =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const youTubeEmbed = (id: string, muted: boolean): string =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=${
    muted ? 1 : 0
  }&rel=0&playsinline=1&loop=1&playlist=${id}&modestbranding=1`;

export const instagramReelEmbed = (shortcode: string): string =>
  `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
