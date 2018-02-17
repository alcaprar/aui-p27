var mongoose = require('mongoose');

var childSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    sessions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}]
});

var childModel = mongoose.model('Child', childSchema);

module.exports = childModel;