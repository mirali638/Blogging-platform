import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const admin = {
    name: 'Santhoshkumar. K',
    email: '9788009123ps@gmail.com',
    avatar: 'S',
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-green-600">
        <span role="img" aria-label="logo">📊</span> Blogging Platform
      </h1>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-semibold">{admin.name}</p>
          <p className="text-sm text-gray-500">{admin.email}</p>
        </div>
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {admin.avatar}
        </div>
        <Link to="/logout">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            <FiLogOut className="inline-block mr-2" />
            Logout
          </button>
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader; 