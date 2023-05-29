import Reporte from "../../types/Reporte";

export const getReportes = async (): Promise<Reporte[]> => {
  const url = `${import.meta.env.VITE_API_URL}/api/reportes`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }

  return [];
};
