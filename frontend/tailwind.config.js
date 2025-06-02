/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fontFamily: {
          montserrat: ["Montserrat", "sans-serif"],
        },
        bgShift: {
          "0%": { backgroundColor: "#bfdbfe" }, // blue-100
          "25%": { backgroundColor: "#ddd6fe" }, // purple-200
          "50%": { backgroundColor: "#fecaca" }, // red-100
          "75%": { backgroundColor: "#bbf7d0" }, // green-100
          "100%": { backgroundColor: "#bfdbfe" }, // blue-100 again
        },
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "bg-shift": "bgShift 15s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
