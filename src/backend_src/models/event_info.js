// used for create event, edit event, input
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new mongoose.Schema({
    owenerID: { type: Schema.Types.ObjectId, ref: 'user'},
    eventName: {type: String, unique: true},
    eventType: {
    	type: String,
    	enum: ['public','private']
    },
    eventCategory: {
    	type: String,
    	enum: ['restaurant','hotel', 'flight']
    },
    eventLocation: String,
    eventTime: { type: Date, default: new Date()},
    splitType: {
        type: String,
        enum: ['even', 'separately']
    },
    invitationList:[{ type: Schema.Types.ObjectId, ref: 'user'}],
    eventStatus: {
        type: String,
        enum: ['in process', 'completed']
    },
    totalAmount: Number,
    memberAccount:[{ type: Schema.Types.ObjectId, ref: 'user'}]

});

module.exports = mongoose.model('eventInfo', eventSchema);