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
        therapist: req.user._id,
        date: req.body.date,
        audio: (req.body.audio && req.body.audio === 'on') ? true : false
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
    var question = req.body;
    for(var i = 0; i < question.items.length; i++){
        question.items[i] = {
            entity: (question.items[i] === 'nothing') ? '' : question.items[i]
        };
        if(question['item'+i+'-isCorrect'] && question['item'+i+'-isCorrect'] === 'on'){
            question.items[i].isCorrect = true;
            delete question['item'+i+'-isCorrect'];
        }else{
            question.items[i].isCorrect = false;
        }
    }
    Session.findOne({_id: sessionId}, function(err, session){
        session.questions.push(question);
        session.save(function(err){
            res.redirect('/manage/session/exercise')
        })
    })

});

router.get('/session/details', isLogged, function (req, res) {
    Session.find({therapist: req.user._id})
        .populate('child')
        .exec(function (err, sessions) {
            console.log('/manage/session/details', err, sessions);
            res.render('therapist-sessions-details', {
                sessions: sessions
            })
        });
});

router.post('/session/results', function(req, res){
    console.log('Session results', req.body);
    var childUsername = req.body.childUsername;
    var questions = req.body.questions;

    Child.findOne({username: childUsername}, function(err, child){
        if(!err && child){
            var lastSessionId = child.sessions[child.sessions.length - 1];
            Session.findOne({_id: lastSessionId}, function(err, session){
                if(!err && session){
                    var currentDate = new Date();

                    var date = currentDate.getDate();
                    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
                    var year = currentDate.getFullYear();
                    var hours = currentDate.getHours();
                    var minutes = currentDate.getMinutes();

                    var dateString = date + "/" +(month + 1) + "/" + year + " " + hours + ":" + minutes;
                    session.results.push({
                        questions: questions,
                        date: dateString
                    });
                    session.save(function(err){
                        if(!err){
                            res.send('ok')
                        }else{
                            res.status(400).send('error while storing session');
                        }

                    })
                }else{
                    res.status(400).send('session does not exits');
                }
            })
        }else{
            res.status(400).send('child does not exits');
        }
    })
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
