const Carts = require('../models/Carts');
const Books = require('../models/Books');

exports.getCartByUserId = async (req, res) => {
    try {
        const cartItems = await Carts.findAll({
            where: { userId: req.user.id },
            include: [{ model: Books, as: 'book' }]
        });
        res.json({ cartItems });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { bookId, quantity } = req.body;
        if (!Number.isInteger(Number(bookId)) || Number(bookId) <= 0 ||
            !Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
            return res.status(400).json({ message: "Book ID dan Quantity harus berupa bilangan bulat positif" });
        }
        const cartItem = await Carts.create({ userId: req.user.id, bookId, quantity });
        res.status(201).json({ cartItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
            return res.status(400).json({ message: "Quantity harus berupa bilangan bulat positif" });
        }

        const cartItem = await Carts.findByPk(req.params.id);
        if (!cartItem || cartItem.userId !== req.user.id) {
            return res.status(404).json({ message: "Item keranjang tidak ditemukan" });
        }

        cartItem.quantity = Number(quantity);
        await cartItem.save();
        res.json({ cartItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const cartItem = await Carts.findByPk(req.params.id);
        if (!cartItem || cartItem.userId !== req.user.id) {
            return res.status(404).json({ message: "Item keranjang tidak ditemukan" });
        }
        await cartItem.destroy();
        res.json({ message: "Item keranjang berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};