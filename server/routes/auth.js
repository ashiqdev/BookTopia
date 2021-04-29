const express = require('express');
const router = express.Router();

const { createOrUpdateUser, currentUser } = require('../controllers/auth');
const { authCheck } = require('../middlewares/auth');

router.get('/', (req, res) => res.send('hello world'));
router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);

module.exports = router;
