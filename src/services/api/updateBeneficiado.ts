import Beneficiado from "../../types/Beneficiado";

export const updateBeneficiado = async (id: number, data: Beneficiado) => {
  const url = `${import.meta.env.VITE_API_URL}/api/beneficiado/update`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ beneficiadoId: id, ...data }),
  });

  const result = await response.json();

  return result;
};
