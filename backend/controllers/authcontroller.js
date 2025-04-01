import User from "../models/model.js";  
import bcrypt from "bcryptjs";  
import jwt from "jsonwebtoken";  
import dotenv from "dotenv";

dotenv.config();  

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

  
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "30m" });

    res.status(201).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "30m" });


    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.json({
      message: "Logged in successfully",
      token,  
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};
