const Carts = require('../models/Carts');

exports.getCartByUserId = async (req, res) => {
    try {
        const cartItems = await Carts.findAll({
            where: { userId: req.params.userId },
            include: [{ model: Books, as: 'book' }]
        });
        res.json({ cartItems });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;
        if (!userId || !bookId || !quantity) {
            return res.status(400).json({ message: "User ID, Book ID, dan Quantity harus diisi" });
        }
        const cartItem = await Carts.create({ userId, bookId, quantity });
        res.status(201).json({ cartItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartItem = await Carts.findByPk(req.params.id);
        if (!cartItem) return res.status(404).json({ message: "Item keranjang tidak ditemukan" });

        cartItem.quantity = quantity;
        await cartItem.save();
        res.json({ cartItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const cartItem = await Carts.findByPk(req.params.id);
        if (!cartItem) return res.status(404).json({ message: "Item keranjang tidak ditemukan" });
        await cartItem.destroy();
        res.json({ message: "Item keranjang berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};