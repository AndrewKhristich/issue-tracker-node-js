const articles = require('../controller/ArticleController');
const express = require('express');
const passport = require('passport');
const authService = require('../service/AuthService');
const router = express.Router();

router.get('/', articles.findAll);
router.post('/', passport.authenticate('jwt', {session: false}), articles.addArticle);
router.get('/self', passport.authenticate('jwt', {session: false}), articles.findCurrentUser);
router.post('/comment', passport.authenticate('jwt', {session: false}), articles.addComment);
router.post('/resolve', passport.authenticate('jwt', {session: false}), articles.resolveOrCloseArticle);
router.get('/:id', articles.findById);

module.exports = router;