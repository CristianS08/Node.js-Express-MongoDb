const express = require('express');
const router = express.Router();
const {getItems, createItem, getItem, updateItem, deleteItem} = require('../controllers/tracks.js');
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks.js');
const {authMiddleware} = require('../middleware/session');
const {checkRole} = require('../middleware/role');

/**
 * List tracks
 */
router.get('/', authMiddleware, getItems);

/**
 * Create a track
 * Onli for admin
 */
router.post('/', validatorCreateItem, authMiddleware, checkRole(['admin']), createItem);

/**
 * Detail a track
 */
router.get('/:id',validatorGetItem, authMiddleware, getItem);

/**
 * Update a track
 * Onli for admin
 */
 router.put('/:id',validatorGetItem, validatorCreateItem, authMiddleware, checkRole(['admin']), updateItem);

 /**
 * Delete a track
 * Onli for admin
 */
  router.delete('/:id',validatorGetItem, authMiddleware, checkRole(['admin']), deleteItem);

module.exports = router; 