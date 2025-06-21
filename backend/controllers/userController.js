const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign role: admin if email matches, else user
    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user";

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("🔍 Login attempt for email:", email);
    console.log("🔍 Password provided:", password ? "Yes" : "No");

    // Check if user exists
    const user = await User.findOne({ email });
    console.log("🔍 User found:", user ? "Yes" : "No");
    
    if (!user) {
      console.log("❌ Login failed: User not found for email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("🔍 User status:", user.status);
    console.log("🔍 User role:", user.role);

    // Check if user is blocked
    if (user.status === "banned") {
      console.log("❌ Login failed: User is banned");
      return res.status(403).json({ message: "Account is blocked. Please contact admin." });
    }

    // Compare password
    console.log("🔍 Comparing passwords...");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password match:", isMatch);
    
    if (!isMatch) {
      console.log("❌ Login failed: Password mismatch for user:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ Password verified successfully");

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT
    console.log("🔍 Generating JWT...");
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set redirect URL based on user role
    let redirectUrl = "/"; // Default to home page for regular users
    if (user.role === "admin") {
      redirectUrl = "/admin/dashboard";
    }

    console.log("✅ Login successful for user:", email);
    console.log("✅ Redirect URL:", redirectUrl);

    // Send response
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      redirectUrl,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout controller
exports.logout = (req, res) => {
  // For stateless JWT, just clear token cookie if any
  res.clearCookie("token"); // Optional if token is in cookie
  res.clearCookie("user"); // Optional if token is in cookie
  res.json({ message: "Logged out successfully" });
};

// Get user profile (protected route)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile (protected route)
exports.updateProfile = async (req, res) => {
  try {
    const { username, phone, address, profileImage } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if they are provided
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (profileImage) user.profileImage = profileImage;

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        address: updatedUser.address,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify token (for frontend token validation)
exports.verifyToken = async (req, res) => {
  try {
    // Token is already verified by auth middleware
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ valid: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Heartbeat endpoint to track user activity
exports.heartbeat = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, {
      lastActivity: new Date()
    });
    res.json({ message: "Heartbeat recorded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    
    // Add online status based on last activity time (within last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const usersWithStatus = users.map(user => ({
      ...user.toObject(),
      isOnline: (user.lastActivity && user.lastActivity > fiveMinutesAgo) || 
                (user.lastLogin && user.lastLogin > fiveMinutesAgo)
    }));

    res.json(usersWithStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user status (admin only)
exports.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    console.log('Updating user status:', { userId, status, adminUser: req.user });

    // Validate status
    if (!['active', 'banned'].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be 'active' or 'banned'" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log('User status updated successfully:', user);
    res.json(user);
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user role (admin only)
exports.updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    console.log('Updating user role:', { userId, role, adminUser: req.user });

    // Validate role
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be 'user' or 'admin'" });
    }

    // Prevent admin from removing their own admin role
    if (userId === req.user.userId && role === 'user') {
      return res.status(400).json({ message: "Cannot remove your own admin role" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log('User role updated successfully:', user);
    res.json(user);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log('Deleting user:', { userId, adminUser: req.user });

    // Prevent admin from deleting themselves
    if (userId === req.user.userId) {
      return res.status(400).json({ message: "Cannot delete your own account" });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log('User deleted successfully:', user);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: "Server error" });
  }
};
