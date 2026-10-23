const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const User = require('../models/User');

router.post('/register', register);
router.post('/login', login);

router.get('/me', protect, async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'name', 'email', 'role'],
    });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json({ user });
});

module.exports = router;