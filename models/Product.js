const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema


const schema = {
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
        type: String,
        //ref: "Category",
        required: true
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        type: String
    },
    shipping: {
        required: false,
        type: Boolean
    }

}


const productSchema = new mongoose.Schema(schema, {timestamps: true})

const Product = mongoose.model('Product', productSchema)

module.exports = {Product} 