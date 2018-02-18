var express = require('express');
var router = express.Router();
var config = require('../config');
var Child = require('../models/child');
var Session = require('../models/session');
var Therapist = require('../models/therapist');

router.get('/', isLogged, function (req, res) {
    res.render('therapist-dashboard')
});

router.get('/child/create', isLogged, function (req, res) {
    res.render('therapist-create-child')
});

router.post('/child/create', isLogged, function (req, res) {
    console.log('Create', req.body);
    var child = new Child(req.body);
    child.save(function(err){
        if(err){
            res.render('therapist-create-child', {
                error: 'The username exists already.'
            })
        }else{
            Therapist.findOne({username: req.user.username}, function(err, therapist){
                if(!err){
                    therapist.children.push(child._id);
                    therapist.save(function(err){
                        res.redirect('/manage/session/create')
                    })
                }
            })
        }
    })
});

router.get('/session/create', isLogged, function (req, res) {
    Child.find({}, function(err, children){
        res.render('therapist-create-session', {
            children: children
        })
    })
});

router.post('/session/create', isLogged, function (req, res) {
    console.log('Session create', req.body);
    var session = new Session({
        child: req.body.child,
        date: req.body.date,
        audio: (req.body.audio && req.body.audio === '') ? true : false
    });
    session.save(function(err){
        if(!err){
            Child.findOne({_id: session.child}, function(err, child){
                child.sessions.push(session._id);
                child.save(function(err){
                    res.redirect('/manage/session/exercise')
                })
            })
        }
    });
});

router.get('/session/exercise', isLogged, function (req, res) {
    Session.find({})
        .populate('child')
        .exec(function(err, sessions){
            res.render('therapist-manage-exercise', {
                sessions: sessions
            })
        })
});

router.post('/session/exercise', isLogged, function (req, res) {
    console.log('Create exercise', req.body);
    var sessionId = req.body.session;
    delete req.body.session;
    var trip = req.body;
    for(var i = 0; i < trip.clothes.length; i++){
        trip.clothes[i] = {
            entity: (trip.clothes[i] === 'nothing') ? '' : trip.clothes[i]
        };
        if(trip['clothes'+i+'-isCorrect'] && trip['clothes'+i+'-isCorrect'] === 'on'){
            trip.clothes[i].isCorrect = true;
            delete trip['clothes'+i+'-isCorrect'];
        }else{
            trip.clothes[i].isCorrect = false;
        }
    }
    Session.findOne({_id: sessionId}, function(err, session){
        session.trips.push(trip);
        session.save(function(err){
            res.redirect('/manage/session/exercise')
        })
    })

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
