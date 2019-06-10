const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    languages: {
        type: [String]
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
