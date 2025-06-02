// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-90 text-gray-300 py-8 mt-12 z-10 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-4">
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} Blogging Platform. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
