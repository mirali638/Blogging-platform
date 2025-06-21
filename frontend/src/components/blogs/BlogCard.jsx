// components/BlogCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden transition hover:shadow-lg">
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>
        <p className="text-sm text-gray-500 mb-2">By {blog.author} | {blog.date}</p>
        <p className="text-gray-700 text-sm line-clamp-3">{blog.excerpt}</p>
        <Link
          to={`/blog/${blog.id}`}
          className="text-green-600 font-medium inline-block mt-3 hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
