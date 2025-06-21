const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth, adminAuth } = require("../middleware/auth");

// Public routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

// Protected routes
router.get("/profile", auth, userController.getProfile);
router.put("/profile", auth, userController.updateProfile);
router.get("/verify", auth, userController.verifyToken);
router.post("/heartbeat", auth, userController.heartbeat);

// Admin only routes
router.get("/all", adminAuth, userController.getAllUsers);
router.put("/:userId/status", adminAuth, userController.updateUserStatus);
router.put("/:userId/role", adminAuth, userController.updateUserRole);
router.delete("/:userId", adminAuth, userController.deleteUser);

module.exports = router;
