// backend/middlewares/authMiddleware.js
import { verifyToken } from '../utils/jwt.js';  // Ensure this is correctly importing the verifyToken function

export const authenticate = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Remove 'Bearer ' from the token string

  if (!token) {
    return res.status(403).json({ message: 'No token provided. Please log in.' });
  }

  try {
    // Verify and decode the token
    const decoded = verifyToken(token);  // verifyToken will decode the JWT and return the payload

    // Attach the userId from the token to the request object
    req.userId = decoded.userId;  // You may have other information in the decoded token, like userId

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Token expired error
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please log in again.' });
    }

    // Invalid token or any other JWT verification issues
    return res.status(401).json({ message: 'Invalid or malformed token. Please provide a valid token.' });
  }
};
