require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const schema = {
    name: {
        type: String,
        maxlength: 50
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String,
        unique: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    cart: {
        type: Array,
        default: []
    },

    history: {
        type: Array,
        default: []
    },

}

const secret = process.env.SECRET
const userSchema = new mongoose.Schema(schema, {timestamps: true})


//HASHING OF PASSWORD
userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    }else {
        next()
    }
})


//GENERATING TOKEN FOR SIGN IN

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        {_id: this._id, isAdmin: this.isAdmin},
        secret
    )
    return token
}




const User = mongoose.model('User', userSchema)

module.exports = {User} 