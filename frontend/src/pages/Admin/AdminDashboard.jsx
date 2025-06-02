import React from "react";
import { Link } from "react-router-dom";
import Logout from "../Admin/Logout"; // 🔁 default import, no curly braces
const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.username || "User"}!</p>
      <Link
        to="/logout"
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </Link>
    </div>
  );
};

export default AdminDashboard;
