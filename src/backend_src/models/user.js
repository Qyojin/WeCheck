var mongoose = require('mongoose');

var user = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
});

module.exports = mongoose.model('user', user);