import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { FiEdit, FiSave, FiX } from 'react-icons/fi';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/userdashboard/users/profile");
        setUser(data);
        setFormData({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
        setErrorMessage("");
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setErrorMessage(
          err.response?.data?.message || "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData.username.trim() || !formData.email.trim()) {
      setErrorMessage("Username and Email are required");
      setSuccessMessage("");
      return;
    }
    try {
      const { data } = await api.put("/userdashboard/users/profile", {
        username: formData.username,
        phone: formData.phone,
        address: formData.address,
      });
      setUser(data.user);
      setFormData({
        username: data.user.username,
        email: data.user.email,
        phone: data.user.phone,
        address: data.user.address,
      });
      setEditMode(false);
      setSuccessMessage("Profile updated successfully");
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setErrorMessage(
        err.response?.data?.message || "Failed to update profile."
      );
    }
  };
  
  const handleCancel = () => {
    setEditMode(false);
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
    });
    setErrorMessage('');
  };

  if (loading) {
    return <div className="text-center mt-20">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-5 px-6">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32"></div>
        <div className="p-6 -mt-16">
          <div className="flex items-center space-x-6">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${formData.username}`}
              alt="User avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{formData.username}</h2>
              <p className="text-sm text-gray-500">{formData.email}</p>
            </div>
            <div className="ml-auto flex space-x-3">
              {editMode ? (
                <>
                  <button onClick={handleUpdate} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
                    <FiSave />
                  </button>
                  <button onClick={handleCancel} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                    <FiX />
                  </button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                  <FiEdit />
                </button>
              )}
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {Object.keys(formData).map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-semibold text-gray-600 capitalize mb-1"
                >
                  {field === 'username' ? 'Username' : field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  readOnly={!editMode || field === 'email'}
                  className={`w-full px-4 py-2 border ${
                    !editMode || field === 'email'
                      ? "border-gray-200 bg-gray-100 cursor-not-allowed"
                      : "border-blue-400 focus:outline-blue-500"
                  } rounded transition-all`}
                />
              </div>
            ))}
          </div>
          {successMessage && (
            <div className="mt-6 text-green-600 font-semibold">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-6 text-red-600 font-semibold">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
