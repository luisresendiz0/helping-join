import { EventoWithCategories } from "../../types/Evento";

export const createEvento = async (
  evento: EventoWithCategories
): Promise<boolean> => {
  const url = `${import.meta.env.VITE_API_URL}/api/eventos/create`;

  try {
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...evento, entidad: "Ciudad de México" }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await result.json();

    return data.success;
  } catch (error) {
    console.log(error);
  }

  return false;
};
