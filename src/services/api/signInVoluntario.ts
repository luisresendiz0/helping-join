type SignInVoluntarioRequest = {
  email: string;
  password: string;
};
const signInVoluntario = async ({
  email,
  password,
}: SignInVoluntarioRequest) => {
  const url = `${import.meta.env.VITE_API_URL}/api/auth/signin-voluntario`;

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

export default signInVoluntario;
