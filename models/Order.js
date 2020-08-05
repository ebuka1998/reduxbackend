// const mongoose = require('mongoose')
// const { ObjectId } = mongoose.Schema



// const schema = {
  
//     product: { type: ObjectId, ref: "Product" },
//     name: String,
//     price: Number,
//     count: Number
// }


// const CartItemSchema = new mongoose.Schema(schema, {timestamps: true})

// const CartItem = mongoose.model('CartItem', CartItemSchema)

// //============================================//

// const schemaa = {
//     products: [CartItemSchema],
//     transaction_id: {},
//     amount: { type: Number },
//     address: String,
//     status: {
//       type: String,
//       default: "Not processed",
//       enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
//     },
//     updated: Date,
//     user: { type: ObjectId, ref: "User" }
// }

// const OrderSchema = new mongoose.Schema(schemaa, {timestamps: true})

// const Order = mongoose.model('Order', OrderSchema)

// module.exports = {CartItem, Order} 



