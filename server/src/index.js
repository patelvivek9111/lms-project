const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const courseRoutes = require('./routes/course');
const { initDb } = require('./utils/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Body:`, req.body);
  next();
});

// Initialize database
initDb();

// Routes
app.use('/api/courses', courseRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});