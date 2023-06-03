export async function blockUser(
  userId,
  token,
  users,
  setUsers,
  loggedInUserId,
  setLoggedIn,
  setToken
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
        body: JSON.stringify({ isBlocked: true }), // Set the isBlocked value to true
      }
    );
    console.log(response);
    if (response.ok) {
      // Update the user's blocked status in the state
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          console.log(user);
          return { ...user, isBlocked: !user.isBlocked };
        }
        return user;
      });

      setUsers(updatedUsers);

      if (userId === loggedInUserId) {
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
