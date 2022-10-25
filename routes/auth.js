const express = require('express');
const router = express.Router();
const {validatorRegister, validatorLogin} = require('../validators/auth');
const {registerCtrl, loginCtrl} = require('../controllers/auth');

/**
 * create an user
 */
router.post('/register', validatorRegister, registerCtrl);

/**
 * Log in user
 */
router.post('/login', validatorLogin, loginCtrl);

module.exports = router;