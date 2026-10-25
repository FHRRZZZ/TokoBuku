const express = require('express');
const router = express.Router();
const {protect, isAdmin} = require('../middleware/auth');

const {
    getPublishers,
    getPublishersById,
    createPublisher,
    updatePublisher,
    deletePublisher
} = require('../controllers/publisherController');

router.get('/', getPublishers);
router.get('/:id', getPublishersById);
router.post('/', protect, isAdmin, createPublisher);
router.put('/:id', protect, isAdmin, updatePublisher);
router.delete('/:id', protect, isAdmin, deletePublisher);

module.exports = router;