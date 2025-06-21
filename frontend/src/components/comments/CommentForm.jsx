import React, { useState } from "react";

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // In a real app, you'd call a function passed via props:
      // onSubmit(comment);
      alert(`Comment submitted: ${comment}`);
      setComment("");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full p-3 border border-gray-300 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm; 