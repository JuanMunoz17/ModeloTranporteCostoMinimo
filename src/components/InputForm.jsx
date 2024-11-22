import React, { useState } from "react";
import costoMinimo from "../utils/calculation";

const InputForm = ({ setStepData, setFinalAllocation }) => {
  const [plants, setPlants] = useState(2);
  const [warehouses, setWarehouses] = useState(2);
  const [capacities, setCapacities] = useState([0, 0]);
  const [demands, setDemands] = useState([0, 0]);
  const [costs, setCosts] = useState([
    [0, 0],
    [0, 0],
  ]);
  const [error, setError] = useState("");

  const handlePlantsChange = (delta) => {
    if (delta === 1) {
      setPlants((prev) => prev + 1);
      setCapacities((prev) => [...prev, 0]);
      setCosts((prev) => prev.map((row) => [...row, 0]));
    } else if (delta === -1 && plants > 1) {
      setPlants((prev) => prev - 1);
      setCapacities((prev) => prev.slice(0, -1));
      setCosts((prev) => prev.map((row) => row.slice(0, -1)));
    }
  };

  const handleWarehousesChange = (delta) => {
    if (delta === 1) {
      setWarehouses((prev) => prev + 1);
      setDemands((prev) => [...prev, 0]);
      setCosts((prev) => [...prev, Array(plants).fill(0)]);
    } else if (delta === -1 && warehouses > 1) {
      setWarehouses((prev) => prev - 1);
      setDemands((prev) => prev.slice(0, -1));
      setCosts((prev) => prev.slice(0, -1));
    }
  };

  const handleSolve = () => {
    if (capacities.some((cap) => isNaN(cap) || cap <= 0)) {
      setError("Todas las capacidades deben ser números positivos.");
      return;
    }
    if (demands.some((dem) => isNaN(dem) || dem <= 0)) {
      setError("Todas las demandas deben ser números positivos.");
      return;
    }
    if (costs.flat().some((cost) => isNaN(cost) || cost < 0)) {
      setError("Todos los costos deben ser números positivos o cero.");
      return;
    }
    const totalCapacity = capacities.reduce((sum, cap) => sum + cap, 0);
    const totalDemand = demands.reduce((sum, dem) => sum + dem, 0);
    if (totalCapacity < totalDemand) {
      setError(
        `La suma de las capacidades (${totalCapacity}) debe ser al menos igual a la suma de las demandas (${totalDemand}).`
      );
      return;
    }
    setError("");
    const { steps, allocation } = costoMinimo(capacities, demands, costs);
    setStepData(steps);
    setFinalAllocation(allocation);
  };

  const handleInputChange = (setter, index, subIndex = null) => (e) => {
    const value = parseFloat(e.target.value.replace(",", ".")) || 0;
    setter((prev) => {
      const newData = [...prev];
      if (subIndex === null) {
        newData[index] = value;
      } else {
        newData[index][subIndex] = value;
      }
      return newData;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-300 w-full max-w-5xl mx-auto">
      <h2 className="text-xl font-bold text-blue-700 dark:text-gray-100 mb-4 text-center">
        Ingresar Datos
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Número de Plantas</h3>
          <div className="flex items-center justify-between sm:justify-start space-x-2">
            <button
              onClick={() => handlePlantsChange(-1)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -
            </button>
            <span className="text-lg font-semibold">{plants}</span>
            <button
              onClick={() => handlePlantsChange(1)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Número de Almacenes</h3>
          <div className="flex items-center justify-between sm:justify-start space-x-2">
            <button
              onClick={() => handleWarehousesChange(-1)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -
            </button>
            <span className="text-lg font-semibold">{warehouses}</span>
            <button
              onClick={() => handleWarehousesChange(1)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Capacidades de Plantas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {capacities.map((capacity, index) => (
              <input
                key={index}
                type="number"
                value={capacity}
                onChange={handleInputChange(setCapacities, index)}
                className="border rounded px-2 py-1 w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
                placeholder={`Capacidad ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Demandas de Almacenes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {demands.map((demand, index) => (
              <input
                key={index}
                type="number"
                value={demand}
                onChange={handleInputChange(setDemands, index)}
                className="border rounded px-2 py-1 w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
                placeholder={`Demanda ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-auto mb-6">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr>
              <th className="border px-4 py-2">Plantas / Almacenes</th>
              {Array.from({ length: plants }, (_, i) => (
                <th key={i} className="border px-4 py-2">Planta {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {costs.map((row, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">Almacén {i + 1}</td>
                {row.map((cost, j) => (
                  <td key={j} className="border px-4 py-2">
                    <input
                      type="number"
                      value={cost}
                      onChange={handleInputChange(setCosts, i, j)}
                      className="border rounded px-2 py-1 w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSolve}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Resolver
        </button>
      </div>
    </div>
  );
};

export default InputForm;
