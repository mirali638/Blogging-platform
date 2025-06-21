import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiFileText, FiGrid, FiActivity } from 'react-icons/fi';

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 ${isActive ? 'bg-gray-300 font-bold' : ''}`
          }
        >
          <FiHome className="mr-3" />
          <span>Welcome</span>
        </NavLink>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 ${isActive ? 'bg-gray-300 font-bold' : ''}`
          }
        >
          <FiHome className="mr-3" />
          <span>Dashboard Overview</span>
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 ${isActive ? 'bg-gray-300 font-bold' : ''}`
          }
        >
          <FiUsers className="mr-3" />
          <span>User Management</span>
        </NavLink>
        <NavLink
          to="/admin/blogs"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 ${isActive ? 'bg-gray-300 font-bold' : ''}`
          }
        >
          <FiFileText className="mr-3" />
          <span>Blog Management</span>
        </NavLink>
        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 ${isActive ? 'bg-gray-300 font-bold' : ''}`
          }
        >
          <FiGrid className="mr-3" />
          <span>Category Management</span>
        </NavLink>
        <NavLink
          to="/admin/logs"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 ${isActive ? 'bg-gray-300 font-bold' : ''}`
          }
        >
          <FiActivity className="mr-3" />
          <span>Activity Logs</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar; 