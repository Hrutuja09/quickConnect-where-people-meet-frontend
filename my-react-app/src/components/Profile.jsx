import React, { useEffect, useState } from "react";

function Profile(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4141/api/my-posts/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h1 style={{margin:'10px'}}>My Profile</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      <div className="profile-container">
        {posts.map((post) => (
          <div
            className="inner-container-profile"
            key={post.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              width: "300px",
            }}
          >
            {post.image && (
              <img
                src={`http://localhost:4141${post.image}`}
                alt=""
                style={{ maxWidth: "300px", height: "250px" }}
              />
            )}
            <div style={{ display: "flex", gap: "5px" }}>
              <p style={{ fontWeight: "bold", fontSize: "10px" }}>
                {props.user}:{" "}
              </p>
              <p style={{ fontSize: "10px" }}>{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
