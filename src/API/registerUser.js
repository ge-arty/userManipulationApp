export async function registerUser(
  firstName,
  lastName,
  email,
  password,
  navigate,
  setError
) {
  try {
    const response = await fetch(
      "https://user-manipulation-app.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      // Handle the registration response
      console.log(data);
      navigate("/");
      return data; // Return the registration data if needed
    } else {
      throw new Error("Registration failed, account already exist!");
    }
  } catch (error) {
    setError(error.message);
    // Handle the error
    console.error(error);
  }
}
