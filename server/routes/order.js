const express = require('express');
const router = express.Router();

const { createOrder, getOrders } = require('../controllers/order');
const { authCheck } = require('../middlewares/auth');

router.post('/orders', authCheck, createOrder);
router.get('/orders', authCheck, getOrders);


module.exports = router;
