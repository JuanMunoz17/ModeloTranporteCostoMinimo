import React from "react";

function TableComponent({ stepData }) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
        Pasos Intermedios
      </h2>
      {stepData.map((step, index) => (
        <div key={index} className="mb-6">
          <h3 className="font-medium text-gray-700 dark:text-gray-200">
            Paso {index + 1}:
          </h3>
          <div className="overflow-x-auto mt-2">
            <table className="w-full table-auto border border-gray-300">
              <thead>
                <tr>
                  {step.allocation[0].map((_, colIndex) => (
                    <th
                      key={colIndex}
                      className="px-4 py-2 border border-gray-300 bg-gray-100 text-center text-sm sm:text-base"
                    >
                      Almacén {colIndex + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.allocation.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((value, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-2 border border-gray-300 text-center text-sm sm:text-base"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TableComponent;
