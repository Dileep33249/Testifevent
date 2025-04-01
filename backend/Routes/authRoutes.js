import express from 'express';
import { signup, login } from '../controllers/authcontroller.js'; 
import { authenticate } from '../middleware/authMiddleware.js';   

const router = express.Router();


router.post('/signup', signup);


router.post('/login', login);


router.get('/profile', authenticate, (req, res) => {

  res.json({ message: `Welcome user with ID ${req.userId}`, userId: req.userId });
});

export default router;
