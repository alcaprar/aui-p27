var express = require('express');
var router = express.Router();
var config = require('../config');

router.use('/game', require('./game'));
router.use('/auth', require('./auth'));
router.use('/manage', require('./management'));

router.get('/', function(req, res){
    res.render('index')
});

// it sends the angular app
router.get('*', function (req, res) {
    res.send('404')
});

module.exports = router;