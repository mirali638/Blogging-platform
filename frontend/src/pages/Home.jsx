import React from "react";
import { Link } from "react-router-dom";
import BlogList from "../components/blogs/BlogList";

const mockCategories = ["Technology", "Travel", "Food", "Lifestyle", "Health"];

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="text-center py-12 bg-indigo-50 rounded-lg mb-8">
        <h1 className="text-4xl font-bold text-indigo-700">Welcome to the Blogging Platform</h1>
        <p className="text-lg text-gray-600 mt-2">Share your stories with the world.</p>
        <Link to="/create-blog" className="mt-4 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Write a Blog
        </Link>
          </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {mockCategories.map((cat) => (
            <span key={cat} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full cursor-pointer hover:bg-gray-300">
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Blogs Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
        <BlogList />
      </div>
    </div>
  );
};

export default Home;
