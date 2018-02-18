const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Therapist = new Schema({
    children: [{type: mongoose.Schema.Types.ObjectId, ref: 'Child'}]
});

Therapist.plugin(passportLocalMongoose);

module.exports = mongoose.model('Therapist', Therapist);