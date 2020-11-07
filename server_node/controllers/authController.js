var User = require('../models/user');

// Показать список всех авторов.
exports.author_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Author list');
};

// Показать подробную страницу для данного автора.
exports.author_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// Показать форму создания автора по запросу GET.
exports.author_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Создать автора по запросу POST.
exports.author_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};
