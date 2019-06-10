const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    usersAttending: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    }
});

module.exports = Event = mongoose.model('event', EventSchema);
