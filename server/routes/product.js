const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  searchProducts
} = require('../controllers/product');
const { authCheck } = require('../middlewares/auth');

router.post('/products', authCheck, createProduct);
router.get('/product/:id', authCheck, getProductById);
router.get('/products', getProducts);
router.delete('/product/:id', authCheck, deleteProductById);
router.get('/search', searchProducts)

module.exports = router;
