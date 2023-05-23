
export const updateEventoInterest = async (id_evento: number, id_voluntario: number) => {
  try {
    const url = 'http://localhost:4000/api/eventos/update-interest'
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ id_evento, id_voluntario }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if(!data.success) throw new Error(data.message);

    return data;
  } catch (error) {
    console.log(error);
  }

  return null;
}