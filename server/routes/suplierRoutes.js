const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');

const {
    getAllSuplier,
    getSuplierById,
    createSuplier,
    updateSuplier,
    deleteSuplier
} = require('../controllers/suplierController');

router.get('/',protect, isAdmin, getAllSuplier);
router.get('/:id',protect, isAdmin, getSuplierById);
router.post('/', protect, isAdmin, createSuplier);
router.put('/:id',protect, isAdmin, updateSuplier);
router.delete('/:id', protect, isAdmin, deleteSuplier)

module.exports = router;
