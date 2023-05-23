import Evento from "../../types/Evento";

export const updateEventoBeneficiado = async (evento: Evento) => {
  const url = `${import.meta.env.VITE_API_URL}/api/eventos/update`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(evento),
  });

  const result = await response.json();

  return result;
};
