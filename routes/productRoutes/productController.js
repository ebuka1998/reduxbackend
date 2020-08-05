const {Product} = require('../../models/Product')
const {User} = require('../../models/User')



const productController = {
    async productById(req, res) {
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).send(product)
        } catch (error) {
            res.status(400).send({error, message: 'product not found'})
        }
    },

    async create(req, res) {
        try {
            const {name, description, price, category, quantity, shipping } = req.body

            let product = new Product({name, description, price, category, quantity, shipping })

            await product.save()

            res.status(200).send(product)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    async listProducts(req, res) {
        try {
            const category = req.query.category ? {category: req.query.category} : {}
            const searchKeyWord = req.query.search ? {
                name: {
                    $regex: req.query.searchKeyWord,
                    $options: 'i'
                } 
            } : {}

            const sortOrder = req.query.sortOrder ? (req.query.sortOrder === 'lowest' ? { price: -1} : {price: 1}) : { _id: 1 }
            //const limit = req.body.limit ? parseInt(req.body.limit) : 6
            const products = await Product.find({ ...category, ...searchKeyWord }).sort(sortOrder)
            res.send(products)
        } catch (error) {
            res.status(400).send(error.message)
        }
       
    },

  
    async listRelated(req, res) {
        try {
            let limit = req.query.limit ? parseInt(req.query.limit) : 6

            const products = await  Product.find({ _id: { $ne: req.product }, category: req.product.category })
                                        .limit(limit)
                                        .populate('category', '_id name')

            res.status(200).send(products)
        } catch (error) {
            res.send(error)
        }
    },

    async addToCart(req, res) {
        try {
            const userInfo = await User.findOne({_id: req.user})
            let duplicate = false

            if(userInfo) {
                userInfo.cart.forEach(item => {
                    if(item.product == req.body.product) {
                        duplicate = true
                    }
                })

            }
            if(duplicate) {
                const userInfo = await User.findOneAndUpdate(
                   
                    { _id: req.user, "cart.id": req.query.productId },
                    { $inc: { "cart.$.quantity": 1 } },
                    { new: true },
                )

                res.status(200).send(userInfo.cart)
            } else {

                const userInfo = await User.findOneAndUpdate(
                    { _id: req.user },
                    {
                        $push: {
                            cart: {
                                id: req.query.productId,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true },
                )

                res.status(200).send(userInfo.cart)
            }  
        } catch (error) {
            res.send(error.message)
        }
        
    },

  
}



module.exports = {productController}



/**
 * router.get('/addToCart', auth, (req, res) => {

    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        let duplicate = false;

        console.log(userInfo)

        userInfo.cart.forEach((item) => {
            if (item.id == req.query.productId) {
                duplicate = true;
            }
        })


        if (duplicate) {
            User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": req.query.productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: req.query.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        }
    })
});


router.get('/removeFromCart', auth, (req, res) => {

    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": req.query._id } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            Product.find({ '_id': { $in: array } })
                .populate('writer')
                .exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                })
        }
    )
})


router.get('/userCartInfo', auth, (req, res) => {
    User.findOne(
        { _id: req.user._id },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })


            Product.find({ '_id': { $in: array } })
                .populate('writer')
                .exec((err, cartDetail) => {
                    if (err) return res.status(400).send(err);
                    return res.status(200).json({ success: true, cartDetail, cart })
                })

        }
    )
})
 */
/**
 *   if(cartitem) {

                const item = cartItem.cart.find(item => item.product == req.body.product);
                let where, action, set;
                if(item){
                    action = "$set";
                    where = { "user": req.body.user, "cart.product": req.body.product};
                    set = "cart.$";
                }else{
                    action = "$push";
                    where = { "user": req.body.user };
                    set = "cart"
                }

                const newItem =  await CartItem.findOneAndUpdate(where, {
                    [action] : {
                        [set] : {
                            _id: item ? item._id : new mongoose.Types.ObjectId(),
                            product: req.body.product,
                            quantity: item ? (item.quantity + req.body.quantity) : req.body.quantity,
                            price: req.body.price,
                            total: item ? req.body.price * (req.body.quantity + item.quantity) : (req.body.price * req.body.quantity)
                        }
                    }
                })

                res.status(200).send(newItem)

            } else {

                const newCartItem = new CartItem({
                    user: req.body.user,
                    cart: [
                        {
                            product: req.body.product,
                            quantity: req.body.quantity,
                            price: req.body.price,
                            total: req.body.quantity * req.body.price
                        }
                    ]
                });
        
               await newCartItem.save()
               res.status(200).send(newCartItem)

            }
 */