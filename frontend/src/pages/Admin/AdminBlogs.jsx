import React from 'react';
import { FiFileText, FiDownload, FiTrash2, FiEye } from 'react-icons/fi';

const mockBlogs = [
  { id: 1, title: 'pid.csv', uploadedBy: 'test1', status: 'processed' },
  { id: 2, title: 'pima-indians-diabetes...', uploadedBy: 'test1', status: 'processed' },
  { id: 3, title: 'pima-indians-diabetes...', uploadedBy: 'test1', status: 'processed' },
  { id: 4, title: 'pid.csv', uploadedBy: 'test1', status: 'processed' },
  { id: 5, title: 'global_air_quality_dat...', uploadedBy: 'test1', status: 'processed' },
];

const AdminBlogs = () => {
  return (
    <div>
      <div className="flex items-center mb-8">
        <FiFileText className="text-3xl text-yellow-500 mr-4" />
        <h1 className="text-3xl font-bold text-gray-800">Blog Post Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="text-lg font-bold truncate">{blog.title}</h3>
      <p className="text-sm text-gray-500 mt-1">Uploaded by: {blog.uploadedBy}</p>
      <p className="text-sm mt-2">Status: <span className="text-green-500 font-semibold">{blog.status}</span></p>

      <div className="mt-4 flex flex-col space-y-2">
        <button className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <FiEye className="mr-2" /> View Details
        </button>
        <button className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          <FiDownload className="mr-2" /> Download
        </button>
        <button className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          <FiTrash2 className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

export default AdminBlogs; 