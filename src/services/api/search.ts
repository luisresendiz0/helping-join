import Beneficiado from "../../types/Beneficiado";
import Evento from "../../types/Evento";
import { Query } from "../../types/Query";

interface SearchResponse {
  eventos: Evento[],
  organizaciones: Beneficiado[],
  civiles: Beneficiado[]
}

export const searchEvents = async (text: string, type: string): Promise<SearchResponse | null> => {
  const url = `${import.meta.env.VITE_API_URL}/api/search`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ text, type }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      return data.data as SearchResponse;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};
