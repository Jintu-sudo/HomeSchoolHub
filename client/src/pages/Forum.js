import React, { useState } from "react";

const initialPosts = [
  {
    id: 1,
    user: "user@example.com",
    title: "Welcome to the Forum!",
    content: "Feel free to ask questions and share resources.",
    file: null,
    comments: [
      { id: 1, text: "Thanks! Glad to be here." },
      { id: 2, text: "Looking forward to learning with everyone." },
    ],
  },
  {
    id: 2,
    user: "another@example.com",
    title: "Math Help Needed",
    content: "Can someone explain fractions?",
    file: null,
    comments: [{ id: 1, text: "Sure! Fractions are parts of a whole." }],
  },
];

const Forum = () => {
  const loggedInUser = "user@example.com";

  const [posts, setPosts] = useState(initialPosts);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});

  const handleCommentChange = (postId, text) => {
    setCommentTexts((prev) => ({ ...prev, [postId]: text }));
  };

  const handleAddComment = (postId) => {
    if (!commentTexts[postId]?.trim()) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: post.comments.length + 1, text: commentTexts[postId] },
              ],
            }
          : post
      )
    );

    setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() && !newContent.trim() && !newFile) {
      alert("Please add a title, content, or attach a file.");
      return;
    }

    const newPost = {
      id: Date.now(),
      user: loggedInUser,
      title: newTitle,
      content: newContent,
      file: newFile
        ? { name: newFile.name, url: URL.createObjectURL(newFile) }
        : null,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
    setNewFile(null);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Community Forum</h1>

      <form onSubmit={handleNewPostSubmit} className="mb-5">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Post Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required={!newFile && !newContent}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Post Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={4}
          required={!newFile && !newTitle}
        />
        <input
          type="file"
          className="form-control mb-2"
          accept=".jpg,.jpeg,.png,.gif,.pdf,.mp4,.mov,.avi"
          onChange={(e) => setNewFile(e.target.files[0])}
        />
        <button type="submit" className="btn btn-primary">Add Post</button>
      </form>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet. Be the first to post!</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="border rounded p-3 mb-4 position-relative shadow-sm"
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            {post.file && (
              <div className="mt-2">
                <strong>Attachment: </strong>
                {post.file.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <img
                    src={post.file.url}
                    alt={post.file.name}
                    className="img-fluid mt-2"
                    style={{ maxHeight: 300 }}
                  />
                ) : post.file.name.match(/\.(mp4|mov|avi)$/i) ? (
                  <video controls className="img-fluid mt-2" style={{ maxHeight: 300 }}>
                    <source src={post.file.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <a href={post.file.url} target="_blank" rel="noreferrer">
                    {post.file.name}
                  </a>
                )}
              </div>
            )}

            {post.user === loggedInUser && (
              <button
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </button>
            )}

            <div className="mt-3">
              <strong>Comments:</strong>
              <ul className="list-group mb-2">
                {post.comments.map((comment) => (
                  <li key={comment.id} className="list-group-item">
                    {comment.text}
                  </li>
                ))}
              </ul>

              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Add a comment"
                  value={commentTexts[post.id] || ""}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                />
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleAddComment(post.id)}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Forum;
