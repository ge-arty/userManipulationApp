export async function deleteUser(
  userId,
  token,
  loggedInUserId,
  setLoggedIn,
  setUsers
) {
  try {
    const response = await fetch(
      `https://user-manipulation-app.onrender.com/api/auth/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      if (userId === loggedInUserId) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setLoggedIn(false);
      } else {
        setUsers((users) => users.filter((user) => user._id !== userId));
      }
    } else {
      throw new Error("Failed to delete user");
    }
  } catch (error) {
    console.error(error);
  }
}
