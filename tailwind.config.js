const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        muted: "var(--color-muted)",
        baseBackground: "var(--color-baseBackground)",
        darkblue: "#033A85",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ":root": {
          "--color-primary": "#6C63FF",
          "--color-secondary": "#FF6584",
          "--color-accent": "#FFC107",
          "--color-background": "#FFFFFF",
          "--color-surface": "#1E1E1E",
          "--color-muted": "#9E9E9E",
          "--color-baseBackground": "#686D76",
        },
        ".dark": {
          "--color-primary": "#A8A4FF",
          "--color-secondary": "#FFA3B1",
          "--color-accent": "#FFD54F",
          "--color-background": "#3C3D37",
          "--color-surface": "#F4F4F5",
          "--color-muted": "#BDBDBD",
          "--color-baseBackground": "#151515",
        },
      });
    }),
  ],
};
