const passport = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const User = require('../model/User');

const consts = require('./GlobalConf');

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, password, cb) {
        return User.findOne({username: username})
            .then(function (val) {
                val.comparePassword(password, function (err, isMatch) {
                    if (!err && isMatch) {
                        return cb(null, val, {message: 'Done'})
                    }
                    return cb(null, false, {message: 'Incorrect username or password'})
                });
            })
            .catch(function (err) {
                return cb(err);
            })
    })
);

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: consts.jwt_secret
    },
    function (jwtPayload, cb) {
        return User.findById(jwtPayload._id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));