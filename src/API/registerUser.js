export async function registerUser(firstName, lastName, email, password) {
  try {
    const response = await fetch(
      "https://auth-backend-2014.onrender.com/api/auth/register",
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
      return data; // Return the registration data if needed
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    throw error; // Throw the error again if needed
  }
}
