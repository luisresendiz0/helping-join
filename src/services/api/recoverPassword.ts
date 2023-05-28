export const recoverPassword = async (email: string, userType: string) => {
  const url = `${import.meta.env.VITE_API_URL}/api/auth/recover-password`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, userType }),
  });

  const data = await response.json();

  return data;
};
