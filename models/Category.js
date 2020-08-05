const mongoose = require('mongoose')

const schema = {
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
}


const categorySchema = new mongoose.Schema(schema, {timestamps: true})

const Category = mongoose.model('Category', categorySchema)

module.exports = {Category} 