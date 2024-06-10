const express = require("express");
const router = express.Router();
const {
    register,
    login
} = require('../controllers/auth.js');

const validator = require('../middlewares/validator.js');
const { registerBody, loginBody } = require('../validations/users.js');

router.post('/register', validator(registerBody), register);

router.post('/login', validator(loginBody), login);

module.exports = router;