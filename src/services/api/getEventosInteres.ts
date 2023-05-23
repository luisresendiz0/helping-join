export const getEventosInteres = async (id_voluntario: number) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/api/eventos/interes?id_voluntario=${id_voluntario}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }

  return [];
};
