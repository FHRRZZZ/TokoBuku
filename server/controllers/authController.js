const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function generateToken(user) {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
}

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Nama, email, dan password harus diisi" });
        }

        const emailSudahAda = await User.findOne({ where: { email } });
        if (emailSudahAda) {
            return res.status(400).json({ message: "Email sudah digunakan" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user",
        });

        const token = generateToken(user);
        res.status(201).json({ 
            message: "Registrasi berhasil", 
            token, user: {id: user.id, name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    } 
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Email atau password salah" });
        }
        
        const passwordCocok = await bcrypt.compare(password, user.password);
        if (!passwordCocok) {
            return res.status(401).json({ message: 'email atau password salah' });
        }

        const token = generateToken(user);
        res.json({
            message: 'Login Berhasil',
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ message: 'terjadi kesalahan server', error: error.message });
    }
};
