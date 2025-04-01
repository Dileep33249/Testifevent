// backend/utils/jwt.js
import jwt from 'jsonwebtoken';

// Function to verify the token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Make sure your JWT_SECRET is defined in .env
    return decoded;  // This will return the decoded JWT (including userId, etc.)
  } catch (error) {
    throw error;  // If there's any issue with the token, the error will be thrown and handled in the middleware
  }
};
