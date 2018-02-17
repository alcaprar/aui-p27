var express = require('express');
var router = express.Router();
var config = require('../config');
var Child = require('../models/child');

router.get('/:childName', function (req, res) {
    var childName = req.params.childName;
    if(childName){
        Child.findOne({username: childName}, function(err, child){
            if(err || !child || child.sessions.length === 0){
                res.redirect('/auth/child')
            }else{
                var lastSession = child.sessions[child.sessions.length - 1]
                res.render('game', {
                    lastSession: lastSession
                })
            }
        });
    }else{
        res.redirect('/auth/child')
    }

});

module.exports = router;