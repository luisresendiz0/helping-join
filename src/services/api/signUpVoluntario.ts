import { VoluntarioWithCategories } from "../../types/Voluntario";

export const signUpVoluntario = async (data: VoluntarioWithCategories) => {
  const url = `${import.meta.env.VITE_API_URL}/api/auth/signup-voluntario`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;
};
