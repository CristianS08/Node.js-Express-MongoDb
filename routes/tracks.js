const express = require('express');
const router = express.Router();
const {getItems, createItem, getItem, updateItem, deleteItem} = require('../controllers/tracks.js');
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks.js');
const {authMiddleware} = require('../middleware/session');
const {checkRole} = require('../middleware/role');

/**
 * Listar los tracks
 */
router.get('/', authMiddleware, getItems);

/**
 * Crear un track
 */
router.post('/', validatorCreateItem, authMiddleware, checkRole(['admin']), createItem);

/**
 * Obtener un track
 */
router.get('/:id',validatorGetItem, authMiddleware, getItem);

/**
 * actualizar un track
 */
 router.put('/:id',validatorGetItem, validatorCreateItem, authMiddleware, checkRole, updateItem);

 /**
 * Eliminar un track
 */
  router.delete('/:id',validatorGetItem, authMiddleware, checkRole, deleteItem);

module.exports = router;