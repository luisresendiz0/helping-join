import { Query } from "../../types/Query";

export const searchEvents = async (query: Query) => {
  const url = `${import.meta.env.VITE_API_URL}/api/search`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
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
