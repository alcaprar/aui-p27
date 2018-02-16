var express = require('express');
var router = express.Router();
var config = require('../config');
var Therapist = require('../models/therapist');
var passport = require('passport');

router.get('/child', function (req, res) {
    res.render('child-login')
});

router.get('/therapist', function (req, res) {
    res.render('therapist-login')
});

router.post('/therapist', passport.authenticate('local', {
    successRedirect : '/manage',
    failureRedirect : '/auth/therapist',
    failureFlash : { type: 'error', message: 'Invalid username or password.' }
}));

router.get('/register', function (req, res) {
    res.render('therapist-register', {
        error: req.flash('error')
    })
});

router.post('/register', function (req, res) {
    Therapist.register(new Therapist({username: req.body.username}), req.body.password, function(err) {
        if (err) {
            res.render('therapist-register', {
                error: 'An error occurred while registering. Try again.'
            });
        }else{
            res.redirect('/auth/therapist');
        }
    });
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;