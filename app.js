const express = require('express');
const app = express();
const pizzasRoute = require('./routes/pizzasRoutes');
const visitRoute = require('./routes/visitsRoutes');
const cors = require('cors');

// Global middleware
app.use(cors());
app.options('*', cors());

// Body json
app.use(express.json());

// Routes
app.use('/api/v1/pizzas', pizzasRoute);
app.use('/api/v1/visits', visitRoute);
app.use('/', (req, res) => res.end('Server live'));

app.all('*', (req, res, next) => {
  console.log('page not found!');
  req.statusCode(404).json({ status: 'fail', message: 'Page not found' });
});

module.exports = app;
