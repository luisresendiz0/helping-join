type SignInModeradorParams = {
  email: string;
  password: string;
};

const signInModerador = async ({ email, password }: SignInModeradorParams) => {
  const url = `${import.meta.env.VITE_API_URL}/api/auth/signin-moderador`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, contrasena: password }),
  });

  const data = await response.json();

  return data;
};

export default signInModerador;
