var express = require('express');
var router = express.Router();
var config = require('../config');

router.get('/game/:kidName', function (req, res) {
    var kidName = req.params.kidName;
    res.send('Real game for ', kidName)
});

module.exports = router;