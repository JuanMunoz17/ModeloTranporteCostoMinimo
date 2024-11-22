import React from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

function Results({ allocation, steps }) {
  // Función para exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Resultado Final del Modelo de Transporte", 10, 10);

    // Agregar los resultados en PDF (correcta correspondencia: filas -> Almacén, columnas -> Planta)
    allocation.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        doc.text(
          `Planta ${rowIndex + 1}, Almacén ${colIndex + 1}: ${value}`,
          10,
          20 + rowIndex * 10 + colIndex * 5
        );
      });
    });

    // Guardar el archivo PDF
    doc.save("resultados_transporte.pdf");
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    // Invertir filas y columnas para exportar coherentemente
    const data = allocation.map((row, rowIndex) => [
      `Planta ${rowIndex + 1}`,
      ...row.map((value, colIndex) => `Almacén ${colIndex + 1}: ${value}`),
    ]);

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
              <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-center">Planta / Almacén</th>
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
                <td className="px-4 py-2 border border-gray-300 text-center font-bold">
                  Planta {rowIndex + 1}
                </td>
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

      {/* Explicación del resultado */}
      <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
        <h3 className="text-lg font-bold text-gray-800">Explicación del Resultado</h3>
        <p className="text-gray-700 mt-2">
          El modelo de transporte ha asignado las cantidades optimizadas desde cada{" "}
          <strong>Planta</strong> hacia cada <strong>Almacén</strong>, minimizando los costos de transporte
          o respetando las restricciones de suministro y demanda. En la tabla anterior:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-2">
          <li>
            Las filas representan las <strong>Plantas</strong>, que son los puntos de origen del suministro.
          </li>
          <li>
            Las columnas representan los <strong>Almacenes</strong>, que son los destinos de la demanda.
          </li>
          <li>
            Los valores en cada celda indican la cantidad asignada de la <strong>Planta</strong> al{" "}
            <strong>Almacén</strong>.
          </li>
        </ul>
        <p className="text-gray-700 mt-2">
          Este resultado muestra la distribución más eficiente posible según los parámetros ingresados, cumpliendo
          con las restricciones de capacidad y demanda definidas.
        </p>
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
