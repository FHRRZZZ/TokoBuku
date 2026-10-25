const Categories = require('../models/Categories');

exports.getCategories = async (req, res) => {
    try{
        const categories = await Categories.findAll({ order: [['name', 'ASC']]})
        res.json({categories});
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Categories.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });

        res.json({ category });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        if (!name) return res.status(400).json({ message: "Nama kategori harus diisi" });

        const existingCategory = await Categories.findOne({ where: {name}});
        if (existingCategory) return res.status(400).json({ message: "Kategori sudah ada" });

        const category = await Categories.create({name, slug, description});
        res.status(201).json({ message: "Kategori berhasil ditambahkan", category})
    } catch(err){
        res.status(500).json({ message: err.message });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Categories.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });

        category.name = name ?? category.name;
        await category.save();
        res.json({ message: "Kategori berhasil diperbarui", category });
    } catch (err){
        res.status(500).json({ message: err.message });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Categories.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });

        await category.destroy();
        res.json({ message: "Kategori berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}