const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Todo = require('./models/todoModel'); // Import the Todo model
const dotenv = require('dotenv');
const connectDB = require('./db_connt'); // Import the connectDB function
const todoRoutes = require('./routes/todoRoutes'); // Import the todo routes

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', todoRoutes); // Use the todo routes



connectDB();
module.exports = app; // Export the app for testing

// app.use()