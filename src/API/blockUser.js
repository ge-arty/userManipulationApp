export async function blockUser(
  userId,
  token,
  users,
  setUsers,
  loggedInUserId,
  setLoggedIn,
  value
) {
  try {
    const response = await fetch(
      `https://user-manipulation-app.onrender.com/api/auth/change-status/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBlocked: value }), // Set the isBlocked value
      }
    );
    // log response
    console.log(response);
    if (response.ok) {
      console.log(value);
      if (userId === loggedInUserId && value === true) {
        // If the logged-in user blocked their own account
        setLoggedIn(false); // Set the loggedIn state to false
        localStorage.removeItem("token"); // Clear the token
      }
    } else {
      throw new Error("Failed to block the user.");
    }
  } catch (error) {
    // Handle the error
    console.error(error);
  }
}
