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

  const handleDeleteUser = () => {
    selectedUsers.forEach((userId) => {
      deleteUser(userId, token, loggedInUserId, setLoggedIn, setUsers);
    });
    setSelectedUsers([]);
  };
  const handleBlockUser = async (value) => {
    await Promise.all(
      selectedUsers.map(async (userId) => {
        return blockUser(
          userId,
          token,
          users,
          setUsers,
          loggedInUserId,
          setLoggedIn,
          value
        );
      })
    );

    getUsers(token, setUsers);

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
          <button onClick={() => handleBlockUser(true)}>Block</button>
          <button onClick={handleDeleteUser}>Delete</button>
          <button onClick={() => handleBlockUser(false)}>unBlock</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Email</th>
            <th>Blocked</th>
            <th>Last Update</th>
            <th>Register Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => toggleUserSelection(user._id)}
                />
              </td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.isBlocked ? "Blocked" : "Not blocked"}</td>
              <td>{formatTimestamp(user.updatedAt)}</td>
              <td>{formatTimestamp(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
