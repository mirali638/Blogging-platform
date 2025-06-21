import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Blog Logo Component
const BlogLogo = () => (
  <div className="flex items-center gap-2 mb-6">
    <div className="bg-blue-600 rounded-xl p-2 shadow-md">
      <svg
        className="w-10 h-10 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M4 4h16v16H4z" strokeLinejoin="round" />
        <path d="M8 8h8v8H8z" fill="white" />
      </svg>
    </div>
    <h1 className="text-2xl font-bold text-blue-700 font-montserrat">
      Blog<span className="text-blue-400">Platform</span>
    </h1>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const result = await login(form);

      // Use the redirectUrl from the server's response
      if (result.redirectUrl) {
        navigate(result.redirectUrl);
      } else {
        // Fallback in case redirectUrl is not provided
        if (result.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setForm({ email: "", password: "" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white font-montserrat">
      <BlogLogo />

      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Welcome Back to{" "}
        <span className="text-blue-600">Blog Platform</span>
      </h1>
      <p className="text-gray-600 text-lg mb-6 text-center">
        Log in to share your stories with the world
      </p>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-blue-50 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6 border border-blue-300"
      >
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-full font-semibold text-lg transition transform hover:scale-105 shadow-md"
        >
          {loading ? "Logging In..." : "Log In"}
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700 underline font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
