import React, { useState } from "react";
import Login from "./Login";

function MainPage() {
  const [showLogin, setShowLogin] = useState(false);

  function handleClick() {
    setShowLogin(true);
  }

  function closeLogin() {
    setShowLogin(false);
  }

  return (
    <>
      <div className={`container-main ${showLogin ? "blur" : ""}`}>
        <div style={{marginTop:"-14px"}}className="navbar">
          <p style={{ fontSize: "25px", marginTop: "15px" }}>QuickConnect</p>
          <div>
            <button style={{ fontSize: "20px"}} className="nav">Home</button>
            <button style={{ fontSize: "20px"}} className="nav">About</button>
            <button style={{ fontSize: "20px"}} className="nav">Services</button>
            <button style={{ fontSize: "20px", marginTop: "15px" }} className="nav">Support</button>
          </div>
        </div>
        <h1 id="h1-main">Welcome!</h1>
        <h2>QuickConnect - Place Where People Meet</h2>
        <img
          src="https://img.freepik.com/premium-vector/connecting-people-social-network-concept-bright-background-vector-illustration_191567-959.jpg?w=2000"
          alt="Social Connection"
        />
        <p id="p-mainpage">Eager to connect with people?</p>
        <button onClick={handleClick} className="button" type="button">
          Let’s get started
        </button>
      </div>

      {showLogin && (
        <div className="modal-overlay" onClick={closeLogin}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <Login />
          </div>
        </div>
      )}
    </>
  );
}

export default MainPage;
