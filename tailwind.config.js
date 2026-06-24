/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px", // Small devices (large phones)
      md: "768px", // Medium devices (tablets)
      lg: "1024px", // Large devices (laptops)
      xl: "1280px", // Extra large devices (desktops)
      "2xl": "1536px", // 2X Extra large devices (large desktops)
    },
    extend: {
      fontFamily: {
        morganite: ["var(--font-morganite)"],
        nyghtSerif: ["var(--font-nyght-serif)"],
        plusJakartaSans: ["var(--font-plus-jakarta-sans)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      height: {
        18: "4.5rem",
        88: "22rem",
      },
      animation: {
        scroll: "scroll 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        "loading-pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        "3xl": "0 35px 60px -12px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
