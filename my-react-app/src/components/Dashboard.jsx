import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RandomPosts from "./RandomPosts";
import NewPosts from "./NewPosts";

function Dashboard(props) {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setNewPost(true);
  }
  function handleLogout(e) {
    e.preventDefault();
    navigate("/");
  }
  function handleProfile(e) {
    e.preventDefault();
    navigate("/profile");
  }
  function closeNewPosts(e) {
    e.preventDefault();
    setNewPost(false);
  }

  return (
    <>
      <div>
        <div className={`navbar ${newPost}? "blur":"" `}>
          <p>QuickConnect</p>
          <div>
            <button className="nav">Short-Videos</button>
            <button onClick={handleClick} className="nav">
              NewPost
            </button>
            <button onClick={handleProfile} className="nav">
              Profile
            </button>
            <button onClick={handleLogout} className="nav">
              Logout
            </button>
          </div>
        </div>
        <h1 style={{ fontSize: "20px", marginTop: "20px" }}>
          Hi, {props.user}
        </h1>
        <RandomPosts user={props.user} />
      </div>
      {newPost && (
        <div className="modal-overlay" onClick={closeNewPosts}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <NewPosts />
          </div>
        </div>
      )}
    </>
  );
}
export default Dashboard;
