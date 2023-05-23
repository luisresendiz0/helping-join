import Evento from "../../types/Evento";

export const getEventosByBeneficiadoId = async (
  id_beneficiado: number
): Promise<Evento[]> => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/api/eventos/beneficiado/${id_beneficiado}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }

  return [];
};
