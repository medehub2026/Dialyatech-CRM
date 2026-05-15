/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          950: "#111827"
        },
        success: "#16a34a"
      },
      boxShadow: {
        soft: "0 12px 30px rgba(15, 23, 42, 0.08)"
      }
    },
  },
  plugins: [],
};
