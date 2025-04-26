require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./database/connect');



const app = express();
app.use(cors());
app.use(express.json());


connectDB();
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);  
app.use('/api/feedback', feedbackRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

