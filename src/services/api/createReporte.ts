export const createReporte = async (
  id_evento: number,
  id_voluntario: number,
  descripcion: string
) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/reportes/create`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ id_evento, id_voluntario, descripcion }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!data.success) throw new Error(data.message);

    return data;
  } catch (error) {
    console.log(error);
  }

  return null;
};
