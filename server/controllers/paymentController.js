const Payments = require("../models/Payments");

exports.createPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod, amount, status } = req.body;
        const payment = await Payments.create({ orderId, paymentMethod, amount, status });
        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};