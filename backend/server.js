const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/userdashboard/users", userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
