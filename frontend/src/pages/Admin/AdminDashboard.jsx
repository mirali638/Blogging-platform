import React from 'react';
import { FiUsers, FiFileText, FiMessageSquare, FiActivity } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Placeholder data - in a real app, this would come from an API
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: <FiUsers className="text-3xl text-blue-500" />,
      color: 'bg-blue-100',
    },
    {
      title: 'Total Posts',
      value: '567',
      icon: <FiFileText className="text-3xl text-green-500" />,
      color: 'bg-green-100',
    },
    {
      title: 'Total Comments',
      value: '8,901',
      icon: <FiMessageSquare className="text-3xl text-yellow-500" />,
      color: 'bg-yellow-100',
    },
    {
      title: 'Active Today',
      value: '42',
      icon: <FiActivity className="text-3xl text-red-500" />,
      color: 'bg-red-100',
    },
  ];

  const quickLinks = [
    { to: '/admin/users', label: 'Manage Users' },
    { to: '/admin/blogs', label: 'Manage Posts' },
    { to: '/admin/categories', label: 'Manage Categories' },
    { to: '/admin/logs', label: 'View Logs' },
  ];

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Admin! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
            <div className={`p-3 rounded-full ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Quick Links</h2>
          <div className="flex flex-col space-y-3">
            {quickLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors p-2 rounded-md hover:bg-indigo-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {/* Placeholder for recent activity */}
            <li className="flex items-center space-x-3">
              <div className="p-2 bg-gray-200 rounded-full">
                <FiUsers className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-700">New user <span className="font-semibold">Alex Doe</span> registered.</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <div className="p-2 bg-gray-200 rounded-full">
                <FiFileText className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-700">New post <span className="font-semibold">"React Hooks Explained"</span> published.</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <div className="p-2 bg-gray-200 rounded-full">
                <FiMessageSquare className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-700">New comment on <span className="font-semibold">"Intro to Tailwind"</span>.</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 