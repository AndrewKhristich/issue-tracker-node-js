var Page = {
    content: null,
    page: null,
    size: null,
    totalPage: null
};

Page.findAllWithPredicate = function (req, res, predicate, schema) {
    var pageNum = req.query.page;
    var pageSize = req.query.size;
    let promise = schema.find(predicate ? predicate : {});
    if (pageNum && pageSize) {
        let number = parseInt(pageNum);
        let size = parseInt(pageSize) > 10 ? 10 : parseInt(pageSize);
        Page.size = size;
        Page.page = number;
        promise = promise.skip((number * size) - size).limit(size);
    }
    schema.count(predicate)
        .then(function (count) {
            Page.totalPage = Math.ceil(count / Page.size);
            promise
                .then(function (val) {
                    Page.content = val;
                    res.send(Page);
                })
                .catch(function (err) {
                    throw err;
                });
        })
        .catch(function (err) {
            throw err;
        });
};

module.exports = Page;