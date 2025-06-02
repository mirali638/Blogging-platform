import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:5000/api/userdashboard/users/login",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate(data.redirectUrl);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 animate-bg-shift transition-colors duration-1000">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl animate-fade-in transition-all duration-700 ease-in-out"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6 tracking-wide">
          Welcome Back
        </h2>

        {error && (
          <div className="text-red-600 text-sm mb-4 animate-pulse text-center">
            {error}
          </div>
        )}

        <div className="relative mb-6">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none bg-transparent pt-6 pb-2 placeholder-transparent"
            placeholder="Email"
          />
          <label className="absolute left-0 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
            Email
          </label>
        </div>

        <div className="relative mb-8">
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none bg-transparent pt-6 pb-2 placeholder-transparent"
            placeholder="Password"
          />
          <label className="absolute left-0 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600">
            Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 active:scale-95"
        >
          Login
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}
