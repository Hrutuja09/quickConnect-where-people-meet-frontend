import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RandomPosts from "./RandomPosts";
import NewPosts from "./NewPosts";
import Notification from "./Notifications";

function Dashboard(props) {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [newPost, setNewPost] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [input, setInput] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();

    //const interval = setInterval(() => {
    //fetchNotifications(); // fetch every 5 seconds
    //}, 5000);

    //return () => clearInterval(interval); // cleanup on unmount
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
  function handleChange(e) {
    setInput(e.target.value);
  }
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      const res = await fetch(`http://localhost:4141/api/search/?q=${input}`, {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await res.json();
      setResults(data);
    }, 400); // debounce: wait 400ms after typing stops

    return () => clearTimeout(delayDebounce);
  }, [input, token]);

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
  function handleBack(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <>
      <div>
        <div className={`navbar ${newPost || notify ? "blur" : ""}`}>
          <p
            style={{ fontSize: "25px", marginTop: "15px", cursor: "pointer" }}
            onClick={handleBack}
          >
            QuickConnect
          </p>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              gap: "20px",
              width: "430px",
              left: "-30px",
            }}
          >
            <input
              onChange={handleChange}
              value={input}
              placeholder="Connect with friends....."
              style={{
                width: "370px",
                height: "35px",
                fontSize: "15px",
                marginLeft: "-40px",
              }}
            ></input>
          </div>
          <div style={{ marginTop: "-1px", width: "480px" }}>
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
                  top: "8px",
                  left: "763px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "13px",
                  width: "18px",
                  height: "17px",
                  textAlign: "center",
                }}
              >
                {unreadCount}
              </span>
            )}
            <button style={{ fontSize: "15px" }} className="nav">
              Short-Videos
            </button>
            <button
              style={{ fontSize: "15px", marginTop: "15px" }}
              onClick={handleClick}
              className="nav"
            >
              NewPost
            </button>
            <button
              style={{ fontSize: "15px", marginTop: "15px" }}
              onClick={handleProfile}
              className="nav"
            >
              Profile
            </button>
            <button
              style={{ fontSize: "15px", marginTop: "15px" }}
              onClick={handleLogout}
              className="nav"
            >
              Logout
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",

            width: "500px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "20px", marginTop: "20px", width: "130px" }}>
              Hi, {props.user}
            </h1>
          </div>
          {results.length > 0 && (
            <div
              style={{
                marginLeft: "64px",
              }}
            >
              <ul
                style={{
                  top: "65px",
                  left: "500px",
                  background: "white",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "368px",
                  listStyle: "none",
                  margin: 0,
                }}
              >
                {results.map((user) => (
                  <li
                    key={user.id}
                    style={{
                      cursor: "pointer",
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                    onClick={() => navigate(`/profile/${user.id}/`)}
                  >
                    {user.username}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

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
