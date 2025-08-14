const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const Todo = require('./models/todoModel');
const connectDB = require('./db_connt');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Only one JSON parser

// API routes
app.use('/api', todoRoutes);

// Serve frontend build folder
app.use(express.static(path.join(__dirname, '../todo-frontend/build')));

// ✅ Catch-all route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../todo-frontend/build', 'index.html'));
});

// Connect DB
connectDB();

module.exports = app;
