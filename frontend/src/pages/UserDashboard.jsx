// pages/UserDashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserDashboard = () => {
  return (
    <div className="relative min-h-screen flex flex-col text-white bg-black">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1470&q=80')",
          zIndex: 0,
        }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        style={{ zIndex: 5 }}
      />

      {/* Navigation Bar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="relative z-10 flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;
