const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    thumbnail: String,
    provider: String,
    facebookId: String
})

const User = mongoose.model('user', userSchema)

module.exports = User;