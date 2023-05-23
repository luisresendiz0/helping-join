export const getCategorias = async () => {
  const url = `${import.meta.env.VITE_API_URL}/api/categorias`;

  const response = await fetch(url);

  const data = await response.json();

  return data;
};
