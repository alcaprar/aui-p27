var express = require('express');
var router = express.Router();
var config = require('../config');
var Child = require('../models/child');

router.get('/', isLogged, function (req, res) {
    res.render('therapist-dashboard')
});

router.get('/child/create', isLogged, function (req, res) {
    res.render('therapist-create-child')
});

router.post('/child/create', isLogged, function (req, res) {
    console.log('Create', req.body)
    var child = new Child(req.body);
    child.save(function(err){
        if(err){
            res.render('therapist-create-child', {
                error: 'The username exists already.'
            })
        }else{
            res.redirect('/manage/session/create')
        }
    })
});

router.get('/session/create', isLogged, function (req, res) {
    res.render('therapist-create-session')
});

router.post('/session/create', isLogged, function (req, res) {
    res.render('therapist-create-session')
});

router.get('/session/results', isLogged, function (req, res) {
    res.render('therapist-see-results')
});

/**
 * Check the request if the user is authenticated.
 * Return an error message if not, otherwise keep going :)
 */
function isLogged(req, res, next) {
    // isAuthenticated is set by `deserializeUser()`
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        res.redirect('/auth/therapist')
    } else {
        next()
    }
}

module.exports = router;
