import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Reset() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const csrfRes = await fetch("http://localhost:4141/api/csrf/", {
      credentials: "include",
    });
    const { csrfToken } = await csrfRes.json();
    const res = await fetch("http://localhost:4141/api/reset-password/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Password Reset Successfully!");
      navigate("/login");
    } else {
      alert(data.error);
    }

    setUsername("");
    setPassword("");
    setPassword1("");

  };

  function handleChangeuser(event) {
    setUsername(event.target.value);
  }
  function handleChangepass(event) {
    setPassword(event.target.value);
  }
  function handleChangepass1(event) {
    setPassword1(event.target.value);
  }

  return (
    <div className="container">
      <h1>QuickConnect - Place Where People Meet</h1>
      <form id="form">
        <input
          onChange={handleChangeuser}
          name="username"
          placeholder="Enter username"
          value={username}
        ></input>
        <input
          onChange={handleChangepass1}
          name="password"
          placeholder="Create a new password"
          value={password1}
        ></input>
        <input
          onChange={handleChangepass}
          name="password"
          placeholder="Re-enter your new password"
          value={password}
        ></input>
        <button onClick={handleRegister} className="button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
export default Reset;
