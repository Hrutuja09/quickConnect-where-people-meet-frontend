import React, { useEffect, useState } from "react";

function RandomPosts() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});

  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);



  // Fetch random posts from backend
  useEffect(() => {
    fetch("http://localhost:4141/api/random-posts/", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // Handle posting a comment
  const handleComment = async (postId) => {
    const csrfRes = await fetch("http://localhost:4141/api/csrf/", {
      credentials: "include",
    });
    const { csrfToken } = await csrfRes.json();

    const res = await fetch(
      `http://localhost:4141/api/posts/${postId}/comment/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ text: commentText[postId] }),
      }
    );
    const data = await res.json();

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, data] }
          : post
      )
    );
    setCommentText("");
  };
  const handleLike = async (postId) => {
    const csrfRes = await fetch("http://localhost:4141/api/csrf/", {
      credentials: "include",
    });
    const { csrfToken } = await csrfRes.json();

    const res = await fetch(
      `http://localhost:4141/api/posts/${postId}/like/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      }
    );
    const data = await res.json();

    if (res.ok){
      setLike(!like)

    }
  };

  return (
    <div
      className="random-posts"
      style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
    >
      {posts.map((post) => (
        <div
          key={post.id}
          className="post-card"
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            maxWidth: "360px",
            height: "510px",
          }}
        >
          <p>
            <b>{post.author}</b>
          </p>
          {post.image && (
            <img
              src={`http://localhost:4141${post.image}`}
              alt=""
              style={{ width: "100%", borderRadius: "8px", height: "300px" }}
            />
          )}
          <button onClick={handleLike}>like</button>
          <p style={{ fontSize: "12px", marginTop: "5px" }}>
            <b>{post.author}: </b>
            <span style={{ color: "#777" }}>{post.content}</span>
          </p>

          {/* Comments section */}
          <p style={{ fontSize: "18px", marginTop: "10px" }}>Comments</p>
          <div style={{ marginTop: "10px" }}>
            {post.comments.map((c) => (
              <p style={{ fontSize: "12px" }} key={c.id}>
                <b>{c.user}:</b> <span style={{ color: "#777" }}>{c.text}</span>
              </p>
            ))}
          </div>

          {/* Comment input */}
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText[post.id] || ""}
              onChange={(e) =>
                setCommentText({ ...commentText, [post.id]: e.target.value })
              }
              style={{ width: "280px", padding: "5px", height: "40px" }}
            />
            <button id="comment-button" onClick={() => handleComment(post.id)}>
              Post
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RandomPosts;
