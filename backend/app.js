// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/service');
const bookingRoutes = require('./routes/booking');

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// DB connection and sync (keep your existing code here)
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync({ alter: true });
    console.log('Models synchronized!');
    app.listen(5000, () => console.log('Server running on port 5000'));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
