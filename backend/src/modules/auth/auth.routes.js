const express = require('express');
const validateRequest = require('../../validators/validateRequest');
const authController = require('./auth.controller');
const { loginSchema, registerSchema } = require('./auth.validator');

const router = express.Router();

router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);

module.exports = router;

