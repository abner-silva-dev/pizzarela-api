const express = require('express');
const router = express.Router();
const pizzaController = require('./../controllers/pizzaController');

router.route('/checkout-session').post(pizzaController.getCheckoutSession);

router.route('/').get(pizzaController.getAllPizzas);

router.route('/:id').get(pizzaController.getOnePizza);

module.exports = router;
