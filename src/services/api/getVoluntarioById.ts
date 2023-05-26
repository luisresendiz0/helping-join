export const getVountarioById = async (id_voluntario: number) => {
  const url = `${import.meta.env.VITE_API_URL}/api/voluntario/${id_voluntario}`;

  const response = await fetch(url);

  const data = await response.json();

  return data;
};
