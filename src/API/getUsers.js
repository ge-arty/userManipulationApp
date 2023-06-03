export async function getUsers(token, setUsers) {
  try {
    const response = await fetch(
      "https://user-manipulation-app.onrender.com/api/auth/allusers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      // Set the users state with the fetched user list
      setUsers(data);
    } else {
      throw new Error("Failed to fetch users");
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    throw error; // Throw the error again if needed
  }
}
