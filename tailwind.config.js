/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Latin display + body
        sans: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        // Technical labels only (the "code" voice)
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        // Arabic display + body
        arabic: ['"Cairo"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0A0E1A", // base canvas
        surface: "#121829", // elevated panels
        "surface-2": "#161d33", // cards
        hair: "#273049", // thin borders
        "hair-strong": "#334063",
        fg: "#ECEFF7", // primary text
        "fg-muted": "#8A93AD", // secondary text
        "fg-faint": "#525d78", // tertiary / dim
        signal: "#4D8DFF", // cool "machine" accent
        "signal-deep": "#2f6fe0",
        warm: "#E0B15C", // warm "human" accent
        "warm-deep": "#c9923c",
      },
      maxWidth: {
        shell: "72rem",
      },
      transitionTimingFunction: {
        cine: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
