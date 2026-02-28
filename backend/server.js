const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const errorMiddleware = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 3000;

const app = express();
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('server is running');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});