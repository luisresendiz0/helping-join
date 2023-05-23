import { BeneficiadoWithCategories } from "../../types/Beneficiado";

export const signUpBeneficiado = async (data: BeneficiadoWithCategories) => {
  const url = `${import.meta.env.VITE_API_URL}/api/auth/signup-beneficiado`;

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
