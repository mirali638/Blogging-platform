import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState({ name: "User", email: "" });
  const profileRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({ name: parsed.name || "User", email: parsed.email || "" });
      } catch (e) {
        console.error("Invalid user JSON in localStorage.");
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => {
    const current = location.pathname;
    if (path === "/") {
      return (
        current === "/" ||
        current === "/user/dashboard" ||
        current === "/user/dashboard/home"
      );
    }
    return current === `/user/dashboard/${path}`;
  };

  return (
    <>
      <style>{`
        @keyframes rainbow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .rainbow-text {
          background: linear-gradient(270deg, #ff0000, #ffa500, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);
          background-size: 1600% 1600%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: rainbow 8s ease infinite;
          user-select: none;
        }

        .nav-link {
          opacity: 0;
          transform: translateY(-20px);
          animation-fill-mode: forwards;
          animation-name: slideFadeIn;
          animation-duration: 0.6s;
          animation-timing-function: ease-out;
        }
        @keyframes slideFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nav-link:nth-child(1) { animation-delay: 0.1s; }
        .nav-link:nth-child(2) { animation-delay: 0.2s; }
        .nav-link:nth-child(3) { animation-delay: 0.3s; }
        .nav-link:nth-child(4) { animation-delay: 0.4s; }
        .nav-link:nth-child(5) { animation-delay: 0.5s; }
        .nav-link:nth-child(6) { animation-delay: 0.6s; }
        .nav-link:nth-child(7) { animation-delay: 0.7s; }
        .nav-link:nth-child(8) { animation-delay: 0.9s; }

        .active-link {
          color: #38bdf8;
          font-weight: 700;
          border-bottom: 2px solid #38bdf8;
          padding-bottom: 2px;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }

        .mobile-menu-enter {
          animation: slideDown 0.3s forwards;
        }
        .mobile-menu-exit {
          animation: slideUp 0.3s forwards;
        }
      `}</style>

      <nav className="fixed w-full top-0 left-0 z-30 flex justify-between items-center py-4 px-6 bg-black bg-opacity-90">
        <h2 className="text-2xl font-extrabold rainbow-text select-none tracking-wide">
          BLOGGING PLATFORM
        </h2>

        <button
          className="text-3xl md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <ul
          className={`transition-all duration-300 ${
            menuOpen ? "flex mobile-menu-enter" : "hidden"
          } flex-col absolute top-full left-0 w-full bg-black bg-opacity-90 shadow-md py-4 px-6 gap-4 font-medium
          md:flex md:flex-row md:static md:shadow-none md:py-0 md:px-0 md:gap-10 md:bg-transparent`}
          style={{ zIndex: 25 }}
        >
          <Link
            to="/user/dashboard/home"
            onClick={() => setMenuOpen(false)}
            className={`transition duration-300 transform hover:text-sky-500 hover:scale-110 ${
              isActive("/") ? "active-link" : ""
            }`}
          >
            Home
          </Link>

          <li className="nav-link">
            <Link
              to="create-post"
              onClick={() => setMenuOpen(false)}
              className={`transition duration-300 transform hover:text-sky-500 hover:scale-110 ${
                isActive("create-post") ? "active-link" : ""
              }`}
            >
              Create Blogs
            </Link>
          </li>
          <li className="nav-link">
            <Link
              to="my-posts"
              onClick={() => setMenuOpen(false)}
              className={`transition duration-300 transform hover:text-sky-500 hover:scale-110 ${
                isActive("my-posts") ? "active-link" : ""
              }`}
            >
              My Blogs
            </Link>
          </li>
          <li className="nav-link">
            <Link
              to="edit-posts"
              onClick={() => setMenuOpen(false)}
              className={`transition duration-300 transform hover:text-sky-500 hover:scale-110 ${
                isActive("edit-posts") ? "active-link" : ""
              }`}
            >
              Edit Blogs
            </Link>
          </li>
          <li className="nav-link">
            <Link
              to="profile"
              onClick={() => setMenuOpen(false)}
              className={`transition duration-300 transform hover:text-sky-500 hover:scale-110 ${
                isActive("profile") ? "active-link" : ""
              }`}
            >
              Profile
            </Link>
          </li>
          <li className="nav-link">
            <Link
              to="contact"
              onClick={() => setMenuOpen(false)}
              className={`transition duration-300 transform hover:text-sky-500 hover:scale-110 ${
                isActive("contact") ? "active-link" : ""
              }`}
            >
              Contact
            </Link>
          </li>
          <li className="nav-link">
            <Link
              to="about"
              onClick={() => setMenuOpen(false)}
              className={`transition duration-300 transform hover:text-sky-500 hover:scale-110 ${
                isActive("about") ? "active-link" : ""
              }`}
            >
              About
            </Link>
          </li>

          {/* 👤 Profile Dropdown */}
          <li className="nav-link relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="transition duration-300 transform hover:text-sky-500 hover:scale-110 text-white flex items-center gap-2"
            >
              👤 {user.name}
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-md shadow-md z-50 px-4 py-3 space-y-2">
                <p className="font-semibold truncate">{user.name}</p>
                <p className="text-sm text-gray-600 truncate">{user.email}</p>
                <hr className="border-gray-300" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-700 hover:text-red-800 transition duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
