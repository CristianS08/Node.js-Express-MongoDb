const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const { validatorGetItem } = require('../validators/storage');
const {createItem, getItem, getItems, deleteItem} = require('../controllers/storage');

/**
 * Crear un item
 */
router.post('/', uploadMiddleware.single('myfile'), createItem);

/**
 * Listar items
 */
router.get('/', getItems);

/**
 * Obtener un detalle
 */
router.get('/:id', validatorGetItem, getItem);

/**
 * Eliminar un item
 */
router.delete('/:id', validatorGetItem, deleteItem);

module.exports = router;