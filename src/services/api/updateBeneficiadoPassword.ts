export const updateBeneficiadoPassword = async (
  beneficiadoId: string,
  password: string,
  newPassword: string
) => {
  const url = `${import.meta.env.VITE_API_URL}/api/beneficiado/updatePassword`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ beneficiadoId, password, newPassword }),
  });

  const data = await response.json();

  return data;
};
