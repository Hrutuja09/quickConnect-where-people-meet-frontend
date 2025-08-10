import React, { useEffect, useState } from "react";

function RandomPosts() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const token = localStorage.getItem("token");

  // Fetch random posts from backend
  useEffect(() => {
    fetch("http://localhost:4141/api/random-posts/", {
      credentials: "include",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // Handle posting a comment
  const handleComment = async (postId) => {
    const res = await fetch(
      `http://localhost:4141/api/posts/${postId}/comment/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
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
    try {
      const res = await fetch(
        `http://localhost:4141/api/posts/${postId}/like/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to like post");
      const updatedPost = await res.json();

      // Update posts state with new like count
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, ...updatedPost } // merge to keep full post data
            : post
        )
      );
    } catch (error) {
      console.error(error);
      alert("Error liking the post.");
    }
  };

  return (
    <div
      className="random-posts"
      style={{ display: "flex", flexWrap: "wrap", gap: "20px", width: "100%" }}
    >
      {posts.map((post) => (
        <div
          key={post.id}
          className="post-card"
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            maxWidth: "360px",
            minWidth: "360px",
            height: "570px",
            position: "relative",
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
          <div style={{ display: "flex", gap: "2px" }}>
            <button
              style={{
                minWidth: "30px",
                fontSize: "25px",
                border: "none",
                backgroundColor: "transparent",
                margin: 0,
                cursor: "pointer",
              }}
              onClick={() => handleLike(post.id)}
            >
              {post.liked ? "❤️" : "🤍"}
            </button>
            <p style={{ marginTop: "18px" }}>{post.likes_count}</p>
          </div>
          <p style={{ fontSize: "12px", marginTop: "5px" }}>
            <b>{post.author}: </b>
            <span style={{ color: "#777" }}>{post.content}</span>
          </p>

          {/* Comments section */}
          <p
            style={{
              fontSize: "15px",
              marginTop: "10px",
            }}
          >
            Comments
          </p>
          <div
            style={{ marginTop: "10px", maxHeight: "56px", overflowY: "auto", scrollbarWidth:"none" }}
          >
            {(post.comments || []).map((c) => (
              <p
                style={{
                  fontSize: "12px",
                }}
                key={c.id || index}
              >
                <b>{c.user}:</b> <span style={{ color: "#777" }}>{c.text}</span>
              </p>
            ))}
          </div>

          {/* Comment input */}
          <div
            style={{
              marginTop: "10px",
              position: "absolute",
              bottom: "10px",
            }}
          >
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
