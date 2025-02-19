import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js"; 
import dashboardRoutes from './routes/dashboardRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars from root directory
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ 
  origin: "http://localhost:5174",
  credentials: true 
}));
app.use(cookieParser());

// Connect to MongoDB with error handling
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mount auth routes
app.use("/api/auth", authRoutes); 

// dashboard routes
app.use('/api/dashboard', dashboardRoutes);

app.get("/", (req, res) => {
  res.send("ReformEdge API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Route not found handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('CORS enabled for origin:', process.env.FRONTEND_URL);
});
