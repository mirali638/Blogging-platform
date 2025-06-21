const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    default: "",
  },
  address: {
    type: String,
    trim: true,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin"], // you can add more roles here
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: { type: String, enum: ["active", "banned"], default: "active" },
  profileImage: String,
  lastLogin: {
    type: Date,
    default: null,
  },
  lastActivity: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
