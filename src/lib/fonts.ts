import localFont from "next/font/local";
import { Plus_Jakarta_Sans, Lato, Special_Elite, Cormorant_Garamond, Libre_Baskerville, Allura, Protest_Revolution, Rye } from "next/font/google";

// Custom local fonts
export const morganite = localFont({
  src: [
    {
      path: "../../public/fonts/Morganite-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Morganite-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Morganite-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-morganite",
  display: "swap",
});

export const nyghtSerif = localFont({
  src: [
    {
      path: "../../public/fonts/NyghtSerif-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/NyghtSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NyghtSerif-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/NyghtSerif-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nyght-serif",
  display: "swap",
});

// Google Font
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const sellendra = localFont({
  src: "../../public/fonts/Sellendra.otf",
  variable: "--font-sellendra",
  display: "swap",
});

export const scriptin = localFont({
  src: "../../public/fonts/SCRIPTIN.ttf",
  variable: "--font-scriptin",
  display: "swap",
});

export const protestRevolution = Protest_Revolution({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-protest-revolution",
  display: "swap",
});

export const rye = Rye({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rye",
  display: "swap",
});

export const brittanySignature = localFont({
  src: "../../public/fonts/BrittanySignature.ttf",
  variable: "--font-brittany-signature",
  display: "swap",
});

export const laStoria = localFont({
  src: "../../public/fonts/La storia Bold Regular.otf",
  variable: "--font-la-storia",
  display: "swap",
});

export const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
});

export const specialElite = Special_Elite({
  subsets: ["latin"],
  variable: "--font-special-elite",
  weight: "400",
  display: "swap",
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  weight: ["400", "700"],
  display: "swap",
});

export const allura = Allura({
  subsets: ["latin"],
  variable: "--font-allura",
  weight: "400",
  display: "swap",
});
