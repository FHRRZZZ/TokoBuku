const Publishers = require('../models/Publishers');

exports.getPublishers = async (req, res) => {
    try{
        const publishers = await Publishers.findAll({ order: [['name', 'ASC']]})
        res.json({publishers});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getPublishersById = async (req, res) => {
    try {
        const publisher = await Publisher.findByPk(req.params.id);
        if (!publisher) return res.status(404).json({ message: "Penerbit tidak ditemukan" });
        res.json({ publisher });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createPublisher = async (req, res) => {
    try {
        const { name, address, phone, email } = req.body;
        if (!name || !address || !phone || !email) return res.status(400).json({ message: "Semua field harus diisi" });
        
        const existingPublisher = await Publisher.findOne({ where: { name } });
        if (existingPublisher) return res.status(400).json({ message: "Penerbit sudah ada" });

        const newPublisher = await Publisher.create({ name, address, phone, email });
        res.status(201).json({ publisher: "Penerbit berhasil ditambahkan", newPublisher });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updatePublisher = async (req, res) => {
    try {
        const { name, address, phone, email } = req.body;
        const publisher = await Publisher.findByPk(req.params.id);
        if (!publisher) return res.status(404).json({ message: "Penerbit tidak ditemukan" });

        publisher.name = name ?? publisher.name;
        publisher.address = address ?? publisher.address;
        publisher.phone = phone ?? publisher.phone;
        publisher.email = email ?? publisher.email;

        await publisher.save();
        res.json({ publisher: "Penerbit berhasil diperbarui", publisher });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deletePublisher = async (req, res) => {
    try {
        const publisher = await Publisher.findByPk(req.params.id);
        if (!publisher) return res.status(404).json({ message: "Penerbit tidak ditemukan" });

        await publisher.destroy();
        res.json({ publisher: "Penerbit berhasil dihapus", publisher });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}