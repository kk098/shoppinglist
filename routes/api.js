'use strict';

module.exports = function(app) {

    // Insert routes below
    app.use('/api/items', require('../api/item'));
    app.use('/api/searchables', require('../api/searchable'));
    app.use('/api/validation', require('../api/validation'));

    // All undefined asset or api routes should return a 404
    // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    //     .get(errors[404]);

    app.get('*', function(req, res) {
        res.render('index', { title: 'Express' });
    });

};