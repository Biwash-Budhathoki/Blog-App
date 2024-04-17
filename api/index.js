import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';


const app = express();
app.use(express.json());


/* MONGOOSE SETUP */
const MONGO_URL = process.env.MONGO_URI;


mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Failed to connect to MongoDB:', error));

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });