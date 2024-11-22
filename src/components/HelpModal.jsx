import React from "react";

const HelpModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={closeModal}
      ></div>
      <div className="relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg w-3/4 max-w-lg z-10">
        <h2 className="text-lg font-bold mb-4">¿Cómo llenar los campos?</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Introduce la capacidad de cada planta en el apartado correspondiente.</li>
          <li>Introduce la demanda de cada almacén en el apartado correspondiente.</li>
          <li>En la tabla de costos, ingresa el costo de transporte por unidad entre cada planta y almacén.</li>
        </ul>
        <button
          onClick={closeModal}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default HelpModal;
