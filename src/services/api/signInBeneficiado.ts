
type SignInBeneficiadoParams = {
  email: string;
  password: string;
}

const signInBeneficiado = async ({ email, password }: SignInBeneficiadoParams) => {
  const url = `${import.meta.env.VITE_API_URL}/api/auth/signin-beneficiado`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ email, contrasena: password })
  });

  const data = await response.json();

  return data;
}

export default signInBeneficiado;