const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    phone: {
        type: String,
        // required: true
    },
    amka: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        // required: true
    },
    telework: { 
        type: Boolean,
        default: false
    },
    teleFrom: String,
    teleUntil: String,
    suspensionOfContact: { 
        type: Boolean,
        default: false
    },
    susFrom: String,
    susUntil: String,
    employees: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);