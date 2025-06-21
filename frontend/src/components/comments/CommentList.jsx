import React from "react";

const CommentList = () => {
  const comments = [
    { id: 1, author: "Jane", text: "Great post!" },
    { id: 2, author: "Alex", text: "Thanks for sharing." },
  ];
  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id} className="mb-2">
          <span className="font-bold">{c.author}:</span> {c.text}
        </li>
      ))}
    </ul>
  );
};

export default CommentList; 