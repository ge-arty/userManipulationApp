import React, { useState } from "react";
import UserList from "./UserList";
import { loginUser } from "../API/loginUser";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(""); // Add userId state
  const [error, setError] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to the login endpoint with email and password
    loginUser(email, password, setLoggedIn, setToken, setUserId, setError);
    console.log(error);
  };
  function logout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
  }

  return (
    <div className="login-wrapper">
      {isLoggedIn ? (
        <div className="userlist">
          <button className="userlist-logout" onClick={logout}>
            LOGOUT
          </button>
          <UserList
            token={token}
            loggedInUserId={userId}
            setLoggedIn={setLoggedIn}
          />
        </div>
      ) : (
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          <form className="login-form" onSubmit={handleLoginSubmit}>
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
            {error && <p className="error">{error}</p>}
            <br />
            <Link to="/registration">Don't have account? Register here!</Link>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
