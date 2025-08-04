import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewPosts() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [mood, setMood] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);
    if (mood) formData.append("mood", mood);

    const csrfRes = await fetch("http://localhost:4141/api/csrf/", {
      credentials: "include",
    });
    const { csrfToken } = await csrfRes.json();

    const res = await fetch("http://localhost:4141/api/posts/", {
      method: "POST",
      credentials: "include",
      headers: { "X-CSRFToken": csrfToken },
      body: formData,
    });

    if (res.ok) {
      navigate("/profile");
    }
  };

  return (
    <div className="container">
      <h1>Create a new Post</h1>
      <form id="form">
        <textarea
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          value={content}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Mood (optional)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <button onClick={handleClick} type="submit">Post</button>
      </form>
    </div>
  );
}

export default NewPosts;
