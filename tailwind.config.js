/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class", // Habilita el modo oscuro mediante una clase
  theme: {
    extend: {
      colors: {
        lightBackground: "#ffffff", // Fondo para tema claro
        darkBackground: "#1e293b", // Fondo para tema oscuro
        lightText: "#1e293b",
        darkText: "#ffffff",
      },
    },
  },
  plugins: [],
};
