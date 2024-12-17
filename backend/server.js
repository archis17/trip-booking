const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

require('dotenv').config();

// Middleware
connectDB();

const corsOptions = {
  origin: ['https://luminous-palmier-aaaca6.netlify.app/',], // Allow multiple origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'username', 'password'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});