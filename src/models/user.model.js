const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    const user = this
    console.log(user)
    next()
})

module.exports = mongoose.model('User', userSchema)