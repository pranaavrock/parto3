import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import Razorpay from "razorpay";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';
import quizRoutes from "./routes/quiz.js";
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";

// Proper __dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));

// API Routes
app.use("/api", quizRoutes);
app.use("/api/users", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Path to frontend build (go up from backend, then into frontend/dist)
const frontendPath = path.join(__dirname, "..", "frontend", "dist");

// Serve frontend in all environments (remove production-only check)
if (fs.existsSync(frontendPath)) {
  console.log("Serving frontend from:", frontendPath);
  app.use(express.static(frontendPath));
  
  // Handle SPA routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
      if (err) {
        console.error('Error serving index.html:', err);
        res.status(500).send('Frontend application loading failed');
      }
    });
  });
} else {
  console.warn("Frontend build not found at:", frontendPath);
  app.get("/", (req, res) => {
    res.send(`
      <h1>Backend Server Running</h1>
      <p>Frontend not built or path incorrect</p>
      <p>Expected at: ${frontendPath}</p>
    `);
  });
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Frontend path: ${frontendPath}`);
  connectDb();
});