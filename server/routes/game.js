var express = require('express');
var router = express.Router();
var config = require('../config');

router.get('/:kidName', function (req, res) {
    var kidName = req.params.kidName;
    if(kidName){
        res.send('Real game for '+ kidName)
    }else{
        res.redirect('/auth/child')
    }

});

module.exports = router;