const Orders = require("../models/Orders");

exports.getOrders = async (req, res) => {
    try {
        const orders = await Orders.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Orders.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { cartId, shippingAddress, status } = req.body;
        if (!cartId || !shippingAddress) {
            return res.status(400).json({ message: "Cart ID and Shipping Address are required" });
        }
        const order = await Orders.create({ cartId, shippingAddress, status });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { shippingAddress, status } = req.body;
        const order = await Orders.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        await order.update({ shippingAddress, status });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Orders.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        await order.destroy();
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};