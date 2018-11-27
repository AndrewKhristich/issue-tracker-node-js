const Article = require('../model/Article').Article;
const Comment = require('../model/Article').Comment;
const AuthService = require('../service/AuthService');
const jwt = require('jsonwebtoken');
const conf = require('../conf/GlobalConf');
const ArticleService = require('../service/ArticleSevice');
const Page = require('../utils/PageUtil');
const ObjectId = require('mongoose').Types.ObjectId;

var ArticleController = {};

ArticleController.findAll = function (req, res, next) {
    Page.findAllWithPredicate(req, res, {}, Article);
};

ArticleController.findCurrentUser = function (req, res, next) {
    let condition = {authorId: req.user._id};
    Page.findAllWithPredicate(req, res, condition, Article)
};

ArticleController.findById = function (req, res, next) {
    Article.findById(req.params.id)
        .populate({path: 'comments', populate: {path: 'authorId'}}).exec(function (error, val) {
        let token = AuthService.extractToken(req);
        if (token) {
            try {
                jwt.verify(token, conf.jwt_secret, function (err, decoded) {
                    if (!err && ObjectId(decoded._id).equals(ObjectId(val.authorId))) {
                        res.send({article: val, isAuthor: true});
                    }
                })
            } catch (e) {
            }
        } else {
            res.send({article: val, isAuthor: false});
        }

    })
};

ArticleController.addArticle = function (req, res, next) {
    let article = ArticleService.createWithUser(req);
    console.log(article);
    article.save()
        .then(function (art) {
            res.send(art);
        })
        .catch(function (err) {
            throw err;
        });
};

ArticleController.addComment = function (req, res, next) {
    let comment = ArticleService.createComment(req);
    Article.findByIdAndUpdate(req.body.articleId, {$push: {comments: comment}})
        .then(function (val) {
            comment.article = val._id;
            comment.save(function (err, commentNew) {
                if (err) {
                    res.status(500).send(err);
                }
                Comment.populate(commentNew, {path : 'authorId'}, function (err, comment) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.send(comment);
                })
            })
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
};

ArticleController.resolveOrCloseArticle = function (req, res, next) {
    let currentUser = req.user;
    let type = req.body.type;
    let articleId = req.body.articleId;
    let commentId = req.body.commentId;

    Article.findById(articleId).then(function (article) {
        if (!ObjectId(article.authorId).equals(ObjectId(currentUser._id))) {
            res.status(403).send({message: 'Wrong user'});
            return;
        }
        article.status = type;
        if (commentId) {
            Comment.findByIdAndUpdate(commentId, {resolved : true})
                .catch(function (err) {
                    res.status(500).send(err);
                    return;
                })
        }

        article.save(function (err, val) {
            if (err) {
                res.send(err);
            }
            res.send();
        });
    })
};

module.exports = ArticleController;