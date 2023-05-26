import Voluntario from "../../types/Voluntario";

export const updateVoluntario = async (id: number, data: Voluntario) => {
  const url = `${import.meta.env.VITE_API_URL}/api/voluntario/update`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ voluntarioId: id, ...data }),
  });

  const result = await response.json();

  return result;
};
