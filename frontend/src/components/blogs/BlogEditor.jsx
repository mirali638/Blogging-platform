// components/BlogEditor.jsx
import React, { useState } from "react";

const BlogEditor = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleSubmit = () => {
    const newBlog = {
      id: Date.now(),
      title,
      content,
      thumbnail,
      author: "Admin",
      date: new Date().toLocaleDateString(),
      excerpt: content.slice(0, 100) + "...",
    };
    onSave(newBlog);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-8 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Write a New Blog</h2>
      <input
        type="text"
        placeholder="Blog Title"
        className="w-full p-3 border border-gray-300 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Thumbnail Image URL"
        className="w-full p-3 border border-gray-300 rounded"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />
      <textarea
        placeholder="Write your blog content here..."
        className="w-full p-3 h-60 border border-gray-300 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Publish
      </button>
    </div>
  );
};

export default BlogEditor;
