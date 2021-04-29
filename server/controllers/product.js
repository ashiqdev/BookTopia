const Product = require('../models/Product');
const Order = require('../models/Order');

const createProduct = async (req, res) => {
  try {
    console.log(req.user);
    const product = await new Product({
      ...req.body.product,
      email: req.user.email,
    }).save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    const orders = await Order.find({ product: product._id });
    if (orders.length > 0) {
      await Order.deleteMany({ product: req.params.id });
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

const searchProducts = async (req, res) => {
  const products = await Product
    // first find products that match
    .find(
      {
        $text: {
          $search: req.query.key,
        },
      },
      {
        score: { $meta: 'textScore' },
      }
    );

  res.json(products);
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  searchProducts,
};
