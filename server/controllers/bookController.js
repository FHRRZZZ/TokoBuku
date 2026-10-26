const Books = require('../models/Books');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Books.findAll({ order: [['title', 'ASC']] });
        res.json({books})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Books.findByPk(req.params.id);
        if (!book) return res.status(404).json({ message: "buku tidak ditemukan" });
        res.json({ book });
    } catch (err) {
        res.status(500).json({ message: "Terjadi kesalahan server", error: err.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const {categoryId, publisherId, title, isbn, description, price, stock, cover_img, publication_year } = req.body;
        if (!title || !categoryId || !publisherId || !isbn || !description || !price || !stock || !cover_img || !publication_year){
            return res.status(400).json({ message: "Semua harus diisi" });
        } 

        const book = await Books.create({ categoryId, publisherId, title, isbn, description, price, stock, cover_img, publication_year })
        res.status(201).json({ messgae: "buku berhasil ditambahkan", book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const {title} = req.body;
        const book = await Books.findByPk(req.params.id);
        if (!book) return res.status(404).json({ message: "kategori tidak ada" });

        book.title = title ?? book.title;
        await book.save();
        res.json({ message: "buku berhasil diedit", book });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.destroyBook = async (req, res) => {
    try {
        const book = await Books.findByPk(req.params.id);
        if(!book) return res.status(404).json({ message: "Buku tidak ada" });

        await book.destroy();
        res.json({ message: "Buku berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};