// components/BlogList.jsx
import React from "react";
import BlogCard from "./BlogCard";

// 🧪 Mock blog data (used as a fallback)
const mockBlogs = [
  {
    id: 1,
    title: "Understanding React Router",
    author: "John Doe",
    date: "June 20, 2025",
    excerpt: "React Router is a standard library for routing in React...",
    thumbnail: "https://source.unsplash.com/random/400x200?react",
  },
  {
    id: 2,
    title: "Tailwind CSS for Beginners",
    author: "Jane Smith",
    date: "June 18, 2025",
    excerpt: "Tailwind CSS is a utility-first CSS framework...",
    thumbnail: "https://source.unsplash.com/random/400x200?tailwind",
  },
];

const BlogList = ({ blogs = mockBlogs }) => { // Accept blogs as a prop, with mockBlogs as default
  const blogsToDisplay = blogs.length > 0 ? blogs : mockBlogs;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogsToDisplay.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
