export const updateVoluntarioPassword = async (data: {
  voluntarioId: number;
  password: string;
  newPassword: string;
}) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/voluntario/updatePassword`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};
