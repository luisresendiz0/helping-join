export const recoverNewPassword = async (
  email: string,
  userType: string,
  password: string
) => {
  const url = `${import.meta.env.VITE_API_URL}/api/auth/recover-new-password`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, userType, password }),
  });

  const data = await response.json();

  return data;
};
