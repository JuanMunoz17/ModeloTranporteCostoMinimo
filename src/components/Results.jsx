import React from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

function Results({ allocation, steps }) {
  // Función para exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Resultado Final del Modelo de Transporte", 10, 10);

    // Agregar los resultados en PDF
    allocation.forEach((row, index) => {
      row.forEach((value, colIndex) => {
        doc.text(`Fila ${index + 1}, Columna ${colIndex + 1}: ${value}`, 10, 20 + index * 10 + colIndex * 5);
      });
    });

    // Guardar el archivo PDF
    doc.save("resultados_transporte.pdf");
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    const data = allocation.map(row => row); // Se puede agregar más información aquí si es necesario
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");

    // Exportar archivo Excel
    XLSX.writeFile(wb, "resultados_transporte.xlsx");
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Resultado Final</h2>

      {/* Tabla con los resultados */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border border-gray-300">
          <thead>
            <tr>
              {allocation[0].map((_, colIndex) => (
                <th key={colIndex} className="px-4 py-2 border border-gray-300 bg-gray-100 text-center">
                  Almacén {colIndex + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allocation.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border border-gray-300 text-center">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botones para exportar */}
      <div className="mt-4 flex space-x-4">
        <button onClick={exportToPDF} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Exportar a PDF
        </button>
        <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Exportar a Excel
        </button>
      </div>
    </div>
  );
}

export default Results;
