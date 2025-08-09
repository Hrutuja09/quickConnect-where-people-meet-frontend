import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    // First fetch CSRF token
    const res = await fetch("http://localhost:4141/api/login/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      navigate("/dashboard");
    } else {
      alert(data.error);
    }
    if (data.token) {
      localStorage.setItem("token", data.token); // save token
    } else {
      alert("Login failed");
    }
    props.user(username);

    setUsername("");
    setPassword("");
  };

  function handleChangeuser(event) {
    setUsername(event.target.value);
  }
  function handleChangepass(event) {
    setPassword(event.target.value);
  }
  function handleRegister(event) {
    event.preventDefault();
    navigate("/register");
  }
  function handleReset(event) {
    event.preventDefault();
    navigate("/reset");
  }

  return (
    <div className="container">
      <h1>QuickConnect - Place Where People Meet</h1>
      <form id="form">
        <input
          onChange={handleChangeuser}
          name="username"
          placeholder="Enter your username"
          value={username}
        ></input>
        <input
          onChange={handleChangepass}
          name="password"
          placeholder="Enter your password"
          value={password}
        ></input>
        <button onClick={handleClick} className="button" type="submit">
          Login
        </button>
        <div id="register-container">
          <p>Do not have an account?</p>
          <button
            onClick={handleRegister}
            className="button-register"
            type="submit"
          >
            Register
          </button>
          <button id="reset-button" onClick={handleReset} type="submit">
            Forgot-password
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
