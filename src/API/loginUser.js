export async function loginUser(
  email,
  password,
  setLoggedIn,
  setToken,
  setUserId
) {
  try {
    const response = await fetch(
      "https://auth-backend-2014.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      // Handle the login response
      console.log(data);
      // Extract the token and userId from the response
      const authToken = data.token;
      const loggedInUserId = data._id;

      // Set the isLoggedIn state to true when login is successful
      setLoggedIn(true);
      // Set the token and userId states
      setToken(authToken);
      setUserId(loggedInUserId);
      return data; // Return the login data if needed
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    throw error; // Throw the error again if needed
  }
}
