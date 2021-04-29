const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const productId = req.body.productId;
    const order = new Order({
      product: productId,
      email: req.user.email,
    }).save();

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
  }
};

const getOrders = async (req, res) => {
  const orders = await Order.find({ email: req.user.email }).populate(
    'product',
    ['name', 'price', 'author']
  );

  res.status(200).json(orders);
};

module.exports = { createOrder, getOrders };
