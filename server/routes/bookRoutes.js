const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');

const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    destroyBook
} = require('../controllers/bookController');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', protect, isAdmin, createBook);
router.put('/:id', protect, isAdmin, updateBook);
router.delete('/:id', protect, isAdmin, destroyBook);

module.exports = router;