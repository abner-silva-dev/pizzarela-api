const fs = require('node:fs');

let data;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

try {
  data = fs.readFileSync('./dev-data/pizza-data.json', 'utf8');
  data = JSON.parse(data);
} catch (err) {
  console.error(err.message);
}

exports.getCheckoutSession = async (req, res, next) => {
  try {
    const order = req.body;

    // const pizzasSelected = order.cart.map(
    //   (pizzaCart) =>
    //     data.pizzas.find((pizza) => +pizza.id === pizzaCart.pizzaId)
    //   // ingredient: pizzaCart.ingredient,
    //   // quantity: pizzaCart.quantity,
    // );

    const pizzasSelected = order?.cart?.map((pizzaCart) => ({
      ...data.pizzas.find((pizza) => +pizza.id === pizzaCart.pizzaId),
      quantity: pizzaCart.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `https://pizzarela.netlify.app/order/${order.id}`,
      cancel_url: `https://pizzarela.netlify.app/order/new`,
      mode: 'payment',
      line_items: pizzasSelected?.map((pizza) => ({
        price_data: {
          currency: 'mxn',
          unit_amount: pizza.unitPrice * 17 * 100,
          product_data: {
            name: `${pizza.name} pizza`,
            description: pizza.ingredient?.join(' '),
            images: [`${pizza.imageUrl}`],
          },
        },
        quantity: pizza.quantity,
      })),
    });

    res.status(200).json({
      status: 'success',
      data: {
        session,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllPizzas = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    result: data?.pizzas.length,
    pizzas: data.pizzas,
  });
};

exports.getOnePizza = (req, res, next) => {
  const pizzaId = +req.params.id;
  const pizza = data.pizzas?.find((pizza) => pizza.id === pizzaId);

  if (!pizza)
    res.status(404).json({ status: 'error', message: 'Pizza no encontrada' });

  res.status(200).json({
    status: 'success',
    data: pizza,
  });
};
