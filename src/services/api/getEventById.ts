import Evento from "../../types/Evento";

export const getEventById = async (
  eventoId: number,
  voluntarioId: number
): Promise<Evento> => {
  const url = `${import.meta.env.VITE_API_URL}/api/eventos/detail`;

  const params = {
    eventoId,
    voluntarioId,
  };

  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  try {
    const response = await fetch(`${url}?${queryString}`);
    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error);
  }

  return {} as Evento;
};
