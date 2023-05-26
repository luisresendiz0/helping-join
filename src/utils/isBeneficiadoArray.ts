const isBeneficiadoArray = (arreglo: any) => {
  // Verificar si el arreglo es un arreglo
  if (!Array.isArray(arreglo)) {
    return false;
  }

  // Verificar el tipo de datos de cada elemento del arreglo
  for (let i = 0; i < arreglo.length; i++) {
    const elemento = arreglo[i];

    // Verificar si el elemento es del tipo Beneficiado
    if (Object.keys(elemento).includes("id_evento")) {
      return false;
    }
  }

  // Si todos los elementos del arreglo son del tipo Beneficiado, retornar true
  return true;
};

export default isBeneficiadoArray;
