const jwt      = require('jsonwebtoken');
const passport = require('passport');
const User     = require('../model/User');
const conf     = require('../conf/GlobalConf');

var AuthController = {};

AuthController.doLogin = function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            console.info(err);
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        user.comparePassword(req.body.password, function (err, isMatch) {
            if (!err && isMatch) {
                req.login(user, {session: false}, (err) => {
                    if (err) {
                        res.send(err);
                    }

                    const token = jwt.sign(user.toJSON(), conf.jwt_secret);

                    return res.json({success : true, user, token});
                });
            } else {
                res.status(401).send({success : false});
            }
        })


    })
    (req, res);
};

AuthController.doRegister = function(req, res, next) {
    new User(req.body).save()
        .then(function (val) {
            AuthController.doLogin(req, res, next);
        })
        .catch(function (err) {
            res.status(500).send();
        });

};

module.exports = AuthController;