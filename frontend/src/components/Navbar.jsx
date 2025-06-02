import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) =>
    path === ""
      ? location.pathname === "/" || location.pathname === "/dashboard"
      : location.pathname.includes(path);

  return (
    <>
      <style>{`
        /* Rainbow gradient animated text */
        @keyframes rainbow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .rainbow-text {
          background: linear-gradient(270deg, #ff0000, #ffa500, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);
          background-size: 1600% 1600%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: rainbow 8s ease infinite;
          user-select: none;
        }

        /* Slide down fade-in for menu links */
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
        /* Stagger animation delays for nav items */
        .nav-link:nth-child(1) { animation-delay: 0.1s; }
        .nav-link:nth-child(2) { animation-delay: 0.2s; }
        .nav-link:nth-child(3) { animation-delay: 0.3s; }
        .nav-link:nth-child(4) { animation-delay: 0.4s; }
        .nav-link:nth-child(5) { animation-delay: 0.5s; }
        .nav-link:nth-child(6) { animation-delay: 0.6s; }
        .nav-link:nth-child(7) { animation-delay: 0.7s; }
        .nav-link:nth-child(8) { animation-delay: 0.9s; } /* Logout button */

        /* Active nav link style */
        .active-link {
          color: #38bdf8; /* Tailwind's sky-400 */
          font-weight: 700;
          border-bottom: 2px solid #38bdf8;
          padding-bottom: 2px;
        }

        /* Hover effect for large screen nav links */
        @media(min-width: 768px) {
          ul.md\\:flex li a {
            transition: color 0.3s ease, transform 0.3s ease;
          }
          ul.md\\:flex li a:hover {
            color: #60a5fa; /* Tailwind sky-500 */
            transform: scale(1.1);
          }
          ul.md\\:flex li button:hover {
            background-color: #dc2626; /* Tailwind red-600 */
          }
        }

        /* Mobile menu slide down/up animation */
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
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
          className={`${
            menuOpen ? "flex mobile-menu-enter" : "hidden"
          } flex-col absolute top-full left-0 w-full bg-black bg-opacity-90 shadow-md py-4 px-6 gap-4 font-medium
          md:flex md:flex-row md:static md:shadow-none md:py-0 md:px-0 md:gap-10 md:bg-transparent`}
          style={{ zIndex: 25 }}
        >
          {[
            { to: "home", label: "Home" },
            { to: "create-post", label: "Create Blogs" },
            { to: "my-posts", label: "My Blogs" },
            { to: "edit-posts", label: "Edit Blogs" },
            { to: "profile", label: "Profile" },
            { to: "contact", label: "Contact" },
            { to: "about", label: "About" },
          ].map(({ to, label }, idx) => (
            <li
              key={label}
              className="nav-link"
              style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
            >
              <Link
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`hover:text-blue-400 transition-colors duration-300 ${
                  isActive(to) ? "active-link" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="nav-link" style={{ animationDelay: "0.9s" }}>
            <button
              onClick={handleLogout}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded transition-colors duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
