import Beneficiado from "../../types/Beneficiado";

export const getBeneficiadoById = async (
  id_beneficiado: number
): Promise<Beneficiado> => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/api/beneficiado/${id_beneficiado}`;

  const response = await fetch(url);

  const data = await response.json();

  return data.data;
};
