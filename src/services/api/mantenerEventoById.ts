export const mantenerEventoById = async (eventoId: number) => {
  const url = `${import.meta.env.VITE_API_URL}/api/reportes/update-status`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ eventoId }),
  });

  const data = await response.json();

  return data.success;
};
