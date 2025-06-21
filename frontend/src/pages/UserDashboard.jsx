// pages/UserDashboard.jsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
// import Welcome from "./Welcome"; // Import Welcome to be the default view

const UserDashboard = () => {
  const location = useLocation();
  const isDashboardHome = location.pathname === "/userdashboard" || location.pathname === "/userdashboard/";

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/user/dashboard/profile" className="block p-2 rounded hover:bg-gray-700">Profile</Link>
            </li>
            <li className="mb-2">
              <Link to="/user/dashboard/my-blogs" className="block p-2 rounded hover:bg-gray-700">My Blogs</Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="block p-2 rounded hover:bg-gray-700">Back to Main Site</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
