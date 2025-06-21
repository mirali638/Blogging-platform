import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-800 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Social Media Icons */}
        <div className="flex space-x-6 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-400 transition-colors"
          >
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-blue-300 transition-colors"
          >
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-200 transition-colors"
          >
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} <span className="font-semibold">Blogging Platform</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
