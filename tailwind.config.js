export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1a1a2e",
          50: "#f4f4f7",
          700: "#23233a",
          900: "#15152a",
        },
        accent: {
          DEFAULT: "#f3d34a",
          dark: "#e8c12e",
        },
      },
      boxShadow: {
        hard: "3px 3px 0 0 #1a1a2e",
        "hard-sm": "2px 2px 0 0 #1a1a2e",
      },
      borderRadius: {
        xl2: "14px",
      },
    },
  },
  plugins: [],
};