import EventoReporte from "../../types/EventoReporte";

export const getReportesByEventoId = async (
  id: number
): Promise<EventoReporte[]> => {
  const url = `http://localhost:4000/api/reportes/evento?eventoId=${id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }

  return [];
};
