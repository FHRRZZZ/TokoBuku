const Supliers = require('../models/Supliers');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

exports.getAllSuplier = async (req, res) => {
    try {
        const suplier = await Supliers.findAll({ order: [['name', 'ASC']] });
        res.json({suplier})
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getSuplierById = async (req, res) => {
    try {
        const suplier = await Supliers.findByPk(req.params.id);
        if (!suplier) return res.status(404).json({ message: "suplier tidak ada"});
        res.json({ suplier });
    } catch(err) {
        res.status(500).json({ message: "terjadi kesalahan server", err: err.message });
    }
};

exports.createSuplier = async (req, res) => {
    try {
        const {name, number_phone, address, email} = req.body;
        if (!name || !number_phone || !address || !email) {
            return res.status(400).json({ message: "semua harus diisi" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "FOrmat tidak sesuai" })
        }

        const existingSuplier = await Supliers.findOne({ where: {name} });
        if (existingSuplier) return res.status(400).json({ message: "Suplier sudah ada"})

        const supp = await Supliers.create({ name, number_phone, address, email });
        res.status(201).json({ message: "suplier berhasil ditambahkan", supp});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateSuplier = async (req, req) => {
    try {
        const { name } = req.body;
        const suplier = await Supliers.findByPk(req.params.id);
        if (!suplier) return res.status(404).json({ message: "suplier tidak ada" });

        suplier.name = name ?? suplier.name;
        await suplier.save();
        res.json({ message: "suplier berhasil diedit", suplier });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteSuplier = async (req, res) => {
    try {
        const suplier = await Supliers.findByPk(req.params.id);
        if (!suplier) return res.status(404).json({ message: "suplier tidak ada" });

        await suplier.destroy();
        res.json({ message: "suplier berhasil dihapus"})
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

