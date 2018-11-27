const Article = require('../model/Article').Article;
const Comment = require('../model/Article').Comment;
const ArticleStatus = require('../model/Article').ArticleStatus;

var ArticleService = {};

ArticleService.createWithUser = function (req) {
    let currentUser = req.user;
    let article = new Article(req.body);
    article.authorId = currentUser._id;
    article.status = ArticleStatus.CREATED;
    article.createDate = new Date();
    return article;
};

ArticleService.createComment = function(req) {
    let currentUser = req.user;
    let comment = req.body.comment;
    comment.authorId = currentUser._id;
    return new Comment(comment);
};

module.exports = ArticleService;