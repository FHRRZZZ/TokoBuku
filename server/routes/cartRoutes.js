const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
    getCartByUserId,
    addToCart,
    updateCartItem,
    deleteCartItem,
} = require('../controllers/cartController');

router.use(protect);
router.get('/', getCartByUserId);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);

module.exports = router;