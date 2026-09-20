require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookingsRouter = require("./routes/bookings");
const { bookingLimiter } = require("./middleware/rateLimiter");

const app = express();

// --- Middleware ---------------------------------------------------------
app.use(express.json());

const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: allowedOrigins,
  })
);

// --- Routes --------------------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Checkpoint API is running" });
});

app.use("/api/bookings", bookingsRouter);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// --- Start -----------------------------------------------------------------
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Checkpoint API listening on http://localhost:${PORT}`);
  });
});
