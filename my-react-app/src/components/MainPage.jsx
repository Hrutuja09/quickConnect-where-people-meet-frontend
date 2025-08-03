import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }
  return (
    <div className="container-main">
      <div className="navbar">
        <p>QuickConnect</p>
        <div>
          <button className="nav">Home</button>
          <button className="nav">About</button>
          <button className="nav">Services</button>
          <button className="nav">Support</button>
        </div>
      </div>
      <h1 id="h1-main">Welcome!</h1>
      <h2>QuickConnect - Place Where People Meet</h2>
      <img src="https://img.freepik.com/premium-vector/connecting-people-social-network-concept-bright-background-vector-illustration_191567-959.jpg?w=2000"></img>
      <p id="p-mainpage">Eagar to connect with people?</p>
      <button onClick={handleClick} className="button" type="submit">
        Let`s get started
      </button>
    </div>
  );
}
export default MainPage;
