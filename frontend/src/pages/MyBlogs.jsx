import React, { useState } from "react";
import { Link } from "react-router-dom";

const mockUserBlogs = [
  { id: 1, title: "My Adventures in React", status: "published", views: 1204 },
  { id: 2, title: "A Draft About State Management", status: "draft", views: 0 },
  { id: 3, title: "Exploring the Alps", status: "published", views: 876 },
];

const MyBlogs = () => {
  const [blogs, setBlogs] = useState(mockUserBlogs);

  const handleDelete = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
      alert(`Blog post ${blogId} deleted (mock).`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Blog Posts</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li key={blog.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    blog.status === 'published' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {blog.status}
                  </span>
                  <span>{blog.views.toLocaleString()} views</span>
                </div>
              </div>
              <div className="space-x-2">
                <Link to={`/edit-blog/${blog.id}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </Link>
                <button onClick={() => handleDelete(blog.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyBlogs; 