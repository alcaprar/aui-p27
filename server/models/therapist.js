const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Therapist = new Schema({});

Therapist.plugin(passportLocalMongoose);

module.exports = mongoose.model('Therapist', Therapist);