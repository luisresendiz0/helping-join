export const deleteEventoByBeneficiado = async (eventoId: number) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/api/eventos/delete-by-beneficiado`;

  const result = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify({ eventoId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await result.json();

  return data.success;
};
