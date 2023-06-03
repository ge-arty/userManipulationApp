import { useState, useEffect } from "react";
import { getUsers } from "../API/getUsers";
import { deleteUser } from "../API/deleteUser";
import { blockUser } from "../API/blockUser";

const UserList = ({ token, loggedInUserId, setLoggedIn }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    getUsers(token, setUsers);
  }, [token]);

  function logout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
  }

  const handleDeleteUser = () => {
    selectedUsers.forEach((userId) => {
      deleteUser(userId, token, loggedInUserId, setLoggedIn, setUsers);
    });
    setSelectedUsers([]);
  };

  const handleBlockUser = () => {
    selectedUsers.forEach((userId) => {
      blockUser(userId, token, users, setUsers, loggedInUserId, setLoggedIn);
    });
    setSelectedUsers([]);
  };

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      const allUserIds = users.map((user) => user._id);
      setSelectedUsers(allUserIds);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <button onClick={logout}>LOGOUT</button>
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedUsers.length === users.length}
            onChange={handleSelectAll}
          />
          Select All
        </label>
      </div>
      <button onClick={handleDeleteUser}>Delete</button>
      <button onClick={handleBlockUser}>
        {selectedUsers.length > 0 &&
        users.find((user) => user._id === selectedUsers[0]).isBlocked
          ? "Unblock"
          : "Block"}
      </button>
      {users.map((user) => (
        <div key={user._id}>
          <p>
            Name: {user.firstName} {user.lastName}
          </p>
          <p>Email: {user.email}</p>
          <input
            type="checkbox"
            checked={selectedUsers.includes(user._id)}
            onChange={() => toggleUserSelection(user._id)}
          />
          <p>Last Online : {user.updatedAt}</p>
          <p>Register Date: {user.createdAt}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
