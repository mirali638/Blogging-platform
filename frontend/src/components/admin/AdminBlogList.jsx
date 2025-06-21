import React, { useState } from "react";

const mockBlogs = [
  { id: 1, title: "Getting Started with React", author: "John Doe", date: "2024-06-10", status: "published" },
  { id: 2, title: "A Guide to Healthy Eating", author: "Jane Smith", date: "2024-06-11", status: "draft" },
  { id: 3, title: "Traveling on a Budget", author: "Alex Ray", date: "2024-06-12", status: "published" },
  { id: 4, title: "Introduction to Machine Learning", author: "Sam Wilson", date: "2024-06-13", status: "pending" },
];

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [filter, setFilter] = useState("all");

  const handleAction = (blogId, action) => {
    alert(`Blog ${blogId} - Action: ${action}`);
  };

  const filteredBlogs = blogs.filter(blog => filter === "all" || blog.status === filter);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Blog Post Management</h2>
      <div className="mb-4">
        <select
          className="p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog) => (
              <tr key={blog.id}>
                <td className="py-2 px-4 border-b">{blog.title}</td>
                <td className="py-2 px-4 border-b">{blog.author}</td>
                <td className="py-2 px-4 border-b">{blog.date}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    blog.status === 'published' ? 'bg-green-200 text-green-800' :
                    blog.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'
                  }`}>
                    {blog.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button onClick={() => handleAction(blog.id, 'Approve')} className="text-green-600 hover:text-green-800">Approve</button>
                  <button onClick={() => handleAction(blog.id, 'Edit')} className="text-blue-600 hover:text-blue-800">Edit</button>
                  <button onClick={() => handleAction(blog.id, 'Delete')} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogList; 