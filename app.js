const express = require('express');
const app = express();
const pizzasRoute = require('./routes/pizzasRoutes');
const cors = require('cors');

// Global middleware
app.use(cors());
app.options('*', cors());

// Body json
app.use(express.json());

// Routes
app.use('/pizzas', pizzasRoute);

module.exports = app;
