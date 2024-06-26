const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: { type: String, required: true},
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String, required: true}
}, {
    versionKey: false
})

const userModel = mongoose.model("User", userSchema)

module.exports = {
    userModel
}