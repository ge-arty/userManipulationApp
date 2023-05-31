import { useState, useEffect } from "react";
import { getUsers } from "../API/getUsers";
import { deleteUser } from "../API/deleteUser";
import { blockUser } from "../API/blockUser";

const UserList = ({ token, loggedInUserId, setLoggedIn }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch all users
    getUsers(token, setUsers);
    console.log(users);
  }, [token]);

  function logout() {
    setLoggedIn(false);
  }

  const handleDeleteUser = (userId) => {
    deleteUser(userId, token, loggedInUserId, setLoggedIn, setUsers);
  };

  const handleBlockUser = (userId) => {
    blockUser(userId, token, users, setUsers);
  };

  return (
    <div>
      <h2>User List</h2>
      <button onClick={logout}>LOGOUT</button>
      {users.map((user) => (
        <div key={user._id}>
          <p>
            Name: {user.firstName} {user.lastName}
          </p>
          <p>Email: {user.email}</p>
          <p>Last Online : {user.updatedAt}</p>
          <p>{user.isBlocked.toString()}</p>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          <button onClick={() => handleBlockUser(user.id)}>
            {user.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
