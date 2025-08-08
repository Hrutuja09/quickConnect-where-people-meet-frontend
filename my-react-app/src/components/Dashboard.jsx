import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RandomPosts from "./RandomPosts";

function Dashboard(props) {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate("/newPosts");
  }
  function handleLogout(e) {
    e.preventDefault();
    navigate("/");
  }
  function handleProfile(e) {
    e.preventDefault();
    navigate("/profile");
  }

  return (
    <div>
      <div className="navbar">
        <p>QuickConnect</p>
        <div>
          <button className="nav">Short-Videos</button>
          <button onClick={handleClick} className="nav">
            NewPost
          </button>
          <button onClick={handleProfile}className="nav">Profile</button>
          <button onClick={handleLogout} className="nav">
            Logout
          </button>
        </div>
      </div>
      <h1 style={{fontSize:'20px', marginTop:'20px'}}>Hi, {props.user}</h1>
      <RandomPosts user={props.user}/>
    </div>
  );
}
export default Dashboard;
