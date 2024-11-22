function costoMinimo(supply, demand, costs) {
    const rows = supply.length;
    const cols = demand.length;
    const allocation = Array.from({ length: rows }, () => Array(cols).fill(0));
    const steps = [];
  
    let i = 0, j = 0;
  
    while (i < rows && j < cols) {
      const minVal = Math.min(supply[i], demand[j]);
      allocation[i][j] = minVal;
      steps.push({ allocation: JSON.parse(JSON.stringify(allocation)) });
      supply[i] -= minVal;
      demand[j] -= minVal;
  
      if (supply[i] === 0) i++;
      else if (demand[j] === 0) j++;
    }
  
    return { steps, allocation };
  }
  
  export default costoMinimo;
  