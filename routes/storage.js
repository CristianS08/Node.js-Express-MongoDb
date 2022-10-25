const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const { validatorGetItem } = require('../validators/storage');
const {createItem, getItem, getItems, deleteItem} = require('../controllers/storage');

/**
 * Update a file
 */
router.post('/', uploadMiddleware.single('myfile'), createItem);

/**
 * List files
 */
router.get('/', getItems);

/**
 * Detail file
 */
router.get('/:id', validatorGetItem, getItem);

/**
 * Delete file
 */
router.delete('/:id', validatorGetItem, deleteItem);

module.exports = router;