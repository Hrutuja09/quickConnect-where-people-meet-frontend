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
            <p style={{fontSize: "10px", marginTop:'10px'}}>
              <b>{props.user}: </b>
              <span style={{color:'#777'}}>{post.content}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
