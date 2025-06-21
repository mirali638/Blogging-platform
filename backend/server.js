console.log("🚀 Server is starting with the latest code...");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ Middleware: Cookie Parser
app.use(cookieParser());

// ✅ CORS Configuration (Support for both 3000 and 5173)
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("🔄 CORS Origin Attempt:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies
  })
);

// ✅ JSON Parser
app.use(express.json());

// ✅ Request Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Request body:", req.body);
  }
  next();
});

// ✅ Connect to MongoDB
connectDB();

// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    origin: req.headers.origin,
  });
});

// ✅ Routes
app.use("/api/userdashboard/users", userRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
