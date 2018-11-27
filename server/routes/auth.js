var express = require('express');
var router = express.Router();
var auth = require('../controller/AuthController');

router.post('/login', auth.doLogin);

router.post('/register', auth.doRegister);

module.exports = router;