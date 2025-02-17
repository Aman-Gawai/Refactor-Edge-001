import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add a GET route handler
router.get('/', protect, (req, res) => {
  res.json({ message: `Welcome to dashboard!` });
});

export default router;

