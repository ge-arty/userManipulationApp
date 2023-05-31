import React, { useState } from "react";
import UserList from "./UserList";
import { loginUser } from "../API/loginUser";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(""); // Add userId state

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to the login endpoint with email and password
    loginUser(email, password, setLoggedIn, setToken, setUserId);
  };

  return (
    <div>
      {isLoggedIn ? (
        <UserList
          token={token}
          loggedInUserId={userId}
          setLoggedIn={setLoggedIn}
        />
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
