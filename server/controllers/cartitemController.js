const CartItem = require('../models/CartItems');

exports.getCartItemsByCartId = async (req, res) => {
    try {
        const cartItems = await CartItem.findAll({ where: { cartId: req.params.cartId } });
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCartItem = async (req, res) => {
    try {
        const { cartId, bookId, quantity } = req.body;
        const cartItem = await CartItem.create({ cartId, bookId, quantity });
        res.status(201).json(cartItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartItem = await CartItem.findByPk(req.params.id);
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        cartItem.quantity = quantity;
        await cartItem.save();
        res.json(cartItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(req.params.id);
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        await cartItem.destroy();
        res.json({ message: "Cart item deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};