export type UpdateModeradorPasswordProps = {
  id_moderador: number;
  contrasena: string;
};

export const updateModeradorPassword = async ({
  id_moderador,
  contrasena,
}: UpdateModeradorPasswordProps) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/api/auth/update-moderador-password`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id_moderador, contrasena }),
  });

  const data = await response.json();

  return data;
};
