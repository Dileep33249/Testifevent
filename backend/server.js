import express from 'express';
import cors from 'cors';  
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './Routes/authRoutes.js';
import eventRoutes from './Routes/eventRoutes.js';

dotenv.config(); 

const app = express();

app.use(cors());

// const corsOptions = {
//   origin: 'http://localhost:5173',  
//   credentials: true, 
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// };

// app.use(cors(corsOptions)); 


app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', eventRoutes); 


const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    console.log(process.env.JWT_SECRET);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectToMongoDB();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Something went wrong!' });
});
