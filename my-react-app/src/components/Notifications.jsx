import React from "react";

function Notification({ notifications, markAsRead }) {
  if (notifications < 1) return <p>No notifications</p>;

  return (
    <div>
      <h2>Notifications</h2>
      <ol style={{ listStyle: "none",maxHeight: "540px", overflowY: "auto", scrollbarWidth:"none"}}>
        {notifications.map((n) => (
          <li
            key={n.id}
            style={{
              padding: "10px",
              margin: "5px 0",
              background: n.is_read ? "#f0f0f0" : "#d1e7dd",
              cursor: "pointer"
            }}
            onClick={() => markAsRead(n.id)}
          >
            {n.message}
            <br />
            <small>{new Date(n.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Notification;
