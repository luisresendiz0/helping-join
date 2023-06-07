export const deleteVoluntarioById = async (voluntarioId: number): Promise<boolean> => {
  const url = `${import.meta.env.VITE_API_URL}/api/voluntario/delete`;

  const result = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify({ voluntarioId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await result.json();

  return data.success;
};
