const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true

    },
    phone: {
        type: String,
        // required: true
    },
    afm: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        // required: true
    },
    employers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);