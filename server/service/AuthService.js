const conf = require('../conf/GlobalConf');
const jwt = require('jsonwebtoken');
const passport = require('passport');

var AuthService = {};

AuthService.extractToken = function (req) {
    let headers = req.headers;
    let authorization = headers.authorization;
    if (authorization) {
        return authorization.split(' ')[1];
    }
};

module.exports = AuthService;