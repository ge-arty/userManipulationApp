export async function blockUser(userId, token, users, setUsers) {
  try {
    const response = await fetch(
      `https://auth-backend-2014.onrender.com/api/auth/block/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBlocked: true }), // Set the isBlocked value to true
      }
    );

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
    } else {
      throw new Error("Failed to block the user.");
    }
  } catch (error) {
    // Handle the error
    console.error(error);
  }
}
