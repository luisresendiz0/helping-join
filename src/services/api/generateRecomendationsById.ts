
export const generateRecomendationsById = async (id: number) => {
  const url = "http://localhost:4000/api/recomendations/generate?voluntarioId=" + id;

  try {
    const response = await fetch(url)
    const data = await response.json();
    return data.success
  } catch (error) {
    console.error(error);
    return false;
  }
}