const Carts = require('../models/Carts');

exports.getCartByUserId = async (req, res) => {
    try {
        const cart = await Carts.findOne({ where: { userId: req.params.userId } });
        res.json({ cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCart = async (req, res) => {
    try {
        const { userId, totalPrice, quantity } = req.body;
        const cart = await Carts.create({ userId, totalPrice, quantity });
        res.status(201).json({ cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { totalPrice, quantity } = req.body;
        const cart = await Carts.findOne({ where: { userId: req.params.userId } });
        if (!cart) {
            return res.status(404).json({ message: "Keranjang tidak ditemukan" });
        }
        cart.totalPrice = totalPrice;
        cart.quantity = quantity;
        await cart.save();
        res.json({ cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const cart = await Carts.findOne({ where: { userId: req.params.userId } });
        if (!cart) {
            return res.status(404).json({ message: "Keranjang tidak ditemukan" });
        }
        await cart.destroy();
        res.json({ message: "Keranjang berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
