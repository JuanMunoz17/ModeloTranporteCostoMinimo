import React, { useState, useEffect } from "react";
import HelpModal from "./HelpModal";
import TheoryModal from "./Theory";

const Header = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showTheory, setShowTheory] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark" // Cargar tema desde almacenamiento local
  );

  // Aplicar tema al cargar la página
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Alternar entre modo oscuro y claro
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <header className="w-full bg-blue-500 dark:bg-darkBackground py-4 shadow-md relative z-10">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        {/* Título */}
        <h1 className="text-white dark:text-darkText text-xl md:text-2xl font-bold w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
          Solucionador de Modelo de Transporte
        </h1>

        {/* Botones */}
        <div className="flex flex-wrap space-x-4 justify-center md:justify-end items-center w-full md:w-auto">
          <button
            onClick={() => setShowHelp(true)}
            className="bg-white dark:bg-darkBackground text-blue-500 dark:text-darkText px-3 py-2 text-sm rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition-all"
          >
            Ayuda
          </button>
          <button
            onClick={() => setShowTheory(true)}
            className="bg-white dark:bg-darkBackground text-blue-500 dark:text-darkText px-3 py-2 text-sm rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition-all"
          >
            Teoría
          </button>

          {/* Botón de cambio de tema */}
          <button
            onClick={toggleTheme}
            className="bg-white dark:bg-darkBackground text-blue-500 dark:text-darkText px-3 py-2 text-sm rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition-all"
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {/* Modales */}
      {showHelp && <HelpModal closeModal={() => setShowHelp(false)} />}
      {showTheory && <TheoryModal closeModal={() => setShowTheory(false)} />}
    </header>
  );
};

export default Header;
