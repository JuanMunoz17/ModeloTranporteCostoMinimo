import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HelpModal from "./components/HelpModal";
import Theory from "./components/Theory";
import InputForm from "./components/InputForm";
import TableComponent from "./components/TableComponent";
import Results from "./components/Results";

const App = () => {
  const [showHelp, setShowHelp] = useState(false); // Control del modal de ayuda
  const [stepData, setStepData] = useState(null); // Datos paso a paso
  const [finalAllocation, setFinalAllocation] = useState(null); // Resultado final
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

  // Alternar tema oscuro/claro
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center transition-colors duration-300">
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 mt-6 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-4">Costo Mínimo</h2>
        <InputForm setStepData={setStepData} setFinalAllocation={setFinalAllocation} />
        {stepData && <TableComponent stepData={stepData} />}
        {finalAllocation && <Results allocation={finalAllocation} />}
      </div>
      {showHelp && <HelpModal closeModal={() => setShowHelp(false)} />}
    </div>
  );
};

export default App;
