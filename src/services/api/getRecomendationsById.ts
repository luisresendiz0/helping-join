export const getRecomendationsById = async (id: number) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/api/recomendations?voluntarioId=${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};
