const {Order, CartItem} = require('../../models/Order')


const orderController = {
    async order(req, res) {
        try {
            const order = await Order.findById().populate('products.product')
            res.send(order)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async create(req, res) {
        try {
            req.body.order.user = req.profile
            const order = new Order(req.body.order)
            await order.save()
            res.send(order)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async listOrders(req, res) {
        try {
            const orders = await Order.find().populate('user', '_id name address').sort('-created')
            res.send(orders)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = {orderController}






// exports.getStatusValues = (req, res) => {
//     res.json(Order.schema.path('status').enumValues);
// };

// exports.updateOrderStatus = (req, res) => {
//     Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             });
//         }
//         res.json(order);
//     });
// };
