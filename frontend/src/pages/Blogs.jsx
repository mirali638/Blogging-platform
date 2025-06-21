// pages/Blogs.jsx
import React, { useState } from "react";
import BlogList from '../components/blogs/BlogList';
import BlogEditor from '../components/blogs/BlogEditor';
import BlogCard from '../components/blogs/BlogCard'; // Optional for extra usage

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const handleSave = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
  };

  return (
    <div className="pt-24 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">All Blog Posts</h1>
      <BlogEditor onSave={handleSave} />
      <div className="mt-10">
        {blogs.length > 0 ? (
          <BlogList blogs={blogs} />
        ) : (
          <p className="text-gray-600 text-center mt-4">No blogs yet. Start writing!</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
