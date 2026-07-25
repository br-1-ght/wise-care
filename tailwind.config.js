/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        brand: {
          green: "#0A5C36",
          "green-mid": "#1A8A56",
          "green-light": "#E8F5EE",
          "green-pale": "#F4FBF7",
          dark: "#0D1F15",
          text: "#1A2E22",
          muted: "#5A7A66",
          border: "#C8E0D2",
          gold: "#B8962E",
          surface: "#F7FDF9",
          red: "#C0392B",
          amber: "#F39C12",
          blue: "#2980B9",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(13,31,21,0.04), 0 8px 24px -12px rgba(13,31,21,0.12)",
        "card-hover": "0 4px 12px rgba(13,31,21,0.08), 0 16px 32px -12px rgba(10,92,54,0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      animation: {
        "pulse-dot": "pulse-dot 2s infinite",
        "scan-line": "scan-line 2s linear infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        "scan-line": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
      },
    },
  },
  plugins: [],
};
