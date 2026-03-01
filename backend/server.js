const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const errorMiddleware = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 3000;

const app = express();

//handle cors
const cors = require('cors');
corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}
app.use(cors(corsOptions));

connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const jobRoutes = require('./routes/job.routes');

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/', (req, res) => {
  res.send('server is running');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});