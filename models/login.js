const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logineSchema = new Schema({
    name: String,
    password: String
});

module.exports = mongoose.model('Login', logineSchema);