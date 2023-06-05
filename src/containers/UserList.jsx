import React, { useState, useEffect } from "react";
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

  const formatTimestamp = (timestamp) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(timestamp).toLocaleString(undefined, options);
  };

  return (
    <div className="userlist-wrapper">
      <div className="userlist-container">
        <h2 className="userlist-title">User List</h2>

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
        <div className="userlist-btn__wrapper">
          <button onClick={handleDeleteUser}>Delete</button>
          <button onClick={handleBlockUser}>
            {selectedUsers.length > 0 &&
            users.find((user) => user._id === selectedUsers[0]).isBlocked
              ? "Unblock"
              : "Block"}
          </button>
        </div>
      </div>

      <div className="userlist-users">
        {users.map((user) => (
          <div className="userlist-user" key={user._id}>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user._id)}
              onChange={() => toggleUserSelection(user._id)}
            />
            <label>Select</label>

            <p>
              Name: {user.firstName} {user.lastName}
            </p>
            <p>Email: {user.email}</p>
            {user.isBlocked ? (
              <p>This user is Blocked!</p>
            ) : (
              <p>This user is not blocked!</p>
            )}
            <p>Last Update: {formatTimestamp(user.updatedAt)}</p>
            <p>Register Date: {formatTimestamp(user.createdAt)}</p>
          </div>
        ))}
      </div>
      <button className="userlist-logout" onClick={logout}>
        LOGOUT
      </button>
    </div>
  );
};

export default UserList;
