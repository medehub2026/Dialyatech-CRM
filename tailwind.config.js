/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f7f5fc",
          100: "#ede6ff",
          200: "#d8c9ff",
          400: "#3ec9d6",
          500: "#6b3fd4",
          600: "#5d35bd",
          700: "#2563eb",
          900: "#23184d",
          950: "#130d2e"
        },
        accent: {
          pink: "#ff4fae",
          cyan: "#3ec9d6",
          violet: "#6b3fd4",
          ink: "#130d2e",
          muted: "#4b4469"
        },
        success: "#16a34a"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(19, 13, 46, 0.08)",
        glow: "0 18px 55px rgba(107, 63, 212, 0.18)"
      }
    },
  },
  plugins: [],
};
