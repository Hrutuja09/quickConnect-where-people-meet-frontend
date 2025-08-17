import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RandomPosts from "./RandomPosts";
import NewPosts from "./NewPosts";
import Notification from "./Notifications";

function Dashboard(props) {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await fetch("http://localhost:4141/api/notification-list/", {
      headers: { Authorization: `Token ${token}` },
    });
    const data = await res.json();
    setNotifications(data);
    const unread = data.filter((n) => n.is_read === false).length;
    setUnreadCount(unread);
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:4141/api/notification/${id}/read/`, {
        method: "POST",
        headers: { Authorization: `Token ${token}` },
      });
      fetchNotifications();
    } catch (err) {
      console.log(err);
    }
  };

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
    setNotify(false);
  }

  function handleNotify(e) {
    e.preventDefault();
    setNotify(true);
  }

  return (
    <>
      <div>
        <div className={`navbar ${newPost || notify ? "blur" : ""}`}>
          <p>QuickConnect</p>
          <div style={{ position: "relative" }}>
            <button
              onClick={handleNotify}
              className="nav"
              style={{ fontSize: "35px" }}
            >
              📩
            </button>
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "30px",
                  right: "450px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "14px",
                  width:"18px",
                  height:"17px",
                  textAlign:"center"
                }}
              >
                {unreadCount}
              </span>
            )}
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

      {notify && (
        <div className="modal-overlay" onClick={closeNewPosts}>
          <div
            className="modal"
            style={{ width: "400px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Notification
              notifications={notifications}
              markAsRead={markAsRead}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
