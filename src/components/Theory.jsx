import React from "react";

const TheoryModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      {/* Fondo borroso */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={closeModal}
      ></div>

      {/* Contenido del modal */}
      <div className="relative bg-white z-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg w-3/4 max-w-lg max-h-[75vh] overflow-y-auto custom-scrollbar">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Teoría: Método de Transporte</h2>
        
        {/* Introducción */}
        <section className="mb-6">
          <h3 className="text-md sm:text-lg font-semibold mb-2">Introducción</h3>
          <p className="text-sm sm:text-base">
            El <strong>Metodo de Transporte</strong> es una técnica matemática que optimiza el costo total de transporte de bienes desde múltiples plantas hacia múltiples almacenes. Es ampliamente utilizado en logística, cadenas de suministro y sistemas de distribución.
          </p>
        </section>

        {/* Otros contenidos */}
        {/* Pasos del Método, Métodos comunes, Aplicaciones Prácticas, etc. */}
        <section className="mb-6">
          <h3 className="text-md sm:text-lg font-semibold mb-2">Pasos del Método</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base">
            <li><strong>Definir el problema:</strong> Identificar las capacidades de las plantas y las demandas de los almacenes, así como los costos de transporte por unidad.</li>
            <li><strong>Balancear el modelo:</strong> Asegurarse de que la suma de capacidades coincida con la suma de demandas; si no, agregar un almacén o planta ficticia.</li>
            <li><strong>Asignación inicial:</strong> Usar métodos como Esquina Noroeste o Costo Mínimo para obtener una solución factible inicial.</li>
            <li><strong>Optimización:</strong> Refinar la solución inicial usando técnicas como el Método MODI o Stepping Stone para reducir aún más los costos.</li>
            <li><strong>Interpretar resultados:</strong> Determinar las cantidades que se deben transportar desde cada planta a cada almacén para minimizar el costo total.</li>
          </ol>
        </section>

        {/* Botón de Cierre */}
        <button
          onClick={closeModal}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default TheoryModal;
