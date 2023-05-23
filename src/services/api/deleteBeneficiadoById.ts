export const deleteBeneficiadoById = async (beneficiadoId: number) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/api/beneficiado/delete/${beneficiadoId}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();

  return data.success;
};
