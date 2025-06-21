import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });
    setTimeout(() => {
      setStatus({ loading: false, success: "Message sent successfully!", error: null });
      setFormData({ fullName: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <section className="min-h-screen bg-green-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10 border border-green-200">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-green-700">📧 Email</h4>
              <p className="text-gray-700">support@excelanalysisplatform.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-green-700">📞 Phone</h4>
              <p className="text-gray-700">+1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-green-700">
                📍 Address
              </h4>
              <p className="text-gray-700">
                123 Data Street, Analytics City, CA 94000
              </p>
            </div>
            <div className="pt-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                alt="contact"
                className="w-24 opacity-80"
              />
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-green-800 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your Name"
                className="w-full border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-green-800 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your Email"
                className="w-full border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-green-800 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Enter your Message"
                className="w-full border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              disabled={status.loading}
            >
              {status.loading ? "Sending..." : "Send Message"}
            </button>

            {/* Feedback */}
            {status.success && (
              <p className="text-green-600 font-semibold mt-2">
                ✅ {status.success}
              </p>
            )}
            {status.error && (
              <p className="text-red-600 font-semibold mt-2">
                ❌ {status.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;