import React from "react";

const HelpModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Fondo oscuro con desenfoque */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={closeModal}
      ></div>

      {/* Contenido del modal */}
      <div className="relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg z-10 mx-4">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
          ¿Cómo llenar los campos?
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
          <li>Introduce la capacidad de cada planta en el apartado correspondiente.</li>
          <li>Introduce la demanda de cada almacén en el apartado correspondiente.</li>
          <li>En la tabla de costos, ingresa el costo de transporte por unidad entre cada planta y almacén.</li>
        </ul>
        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all text-sm sm:text-base"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
