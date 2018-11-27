const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CommentSchema = new Schema({
    resolved: {
        type: Boolean,
        default: false
    },
    content: {
        type: String,
        maxLength: 40,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const statusTypes = {CREATED : 'Created', RESOLVED : 'Resolved', CLOSED : "Colsed"};

var ArticleSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        maxLength: 30,
        required: true
    },
    content: {
        type: String,
        maxLength: 100,
        required: true
    },
    status: {
        type: String,
        enum: [statusTypes.CREATED, statusTypes.RESOLVED, statusTypes.CLOSED],
    },
    createDate: {
        type: Date,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports.Article = mongoose.model('Article', ArticleSchema);
module.exports.Comment = mongoose.model('Comment', CommentSchema);
module.exports.ArticleStatus = statusTypes;