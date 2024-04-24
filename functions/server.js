const express = require('express');
const pizzaController = require('./../controllers/pizzaController');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });
const router = express.Router();

const app = express();

const cors = require('cors');

// Global middleware
app.use(cors());
app.options('*', cors());

// Body json
app.use(express.json());

// Routes
router
  .route('/pizzas/checkout-session')
  .post(pizzaController.getCheckoutSession);

router.route('/pizzas').get(pizzaController.getAllPizzas);

router.route('/pizzas/:id').get(pizzaController.getOnePizza);

// Init server
app.use('/netlify/functions/server', router);
const handler = serverless(app);
app.listen(3000);
