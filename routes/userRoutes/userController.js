
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const {User} = require('../../models/User')
const {Order} = require('../../models/Order')


const userController = {

    async createUser (req, res) {
        const secret = process.env.SECRET
        const {name, email, password, history, role, cart } = req.body
        
        //CHECK IF EMAIL EXISTS

        const emaiExist = await User.findOne({email: req.body.email})

        if(emaiExist) {
            return res.status(400).send({message: 'email already exist'})
        }

        try {
           let user = new User({name, email, password, role , history, cart}) 

           await user.save()

           //ASSIGNING TOKEN TO REGISTERED USER

           const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, secret, {expiresIn: 9000000})

           res.header('auth-token').send({success: true, message: `${user.name} created successfully`, token, user})
        } catch (error) {
            res.send(error.message)
        }
    },

    async signInUser (req, res) {
        try {
            const secret = process.env.SECRET

            //CHECKING IF USER EXIST

            const user = await User.findOne({email: req.body.email})

            if(!user) return res.status(404).send({message: 'inavalid password or email'})

            //DECODING THE HASHED PASSWORD

            const password = bcrypt.compare(req.body.password, user.password)

            if(!password) return res.status(404).send('invalid password or email')

            //CREATING AND ASSIGNING TOKEN

            const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, secret, {expiresIn: 9000000})

            res.header('auth-token').json({success: true, message: `${user.name} signed in successfully`, token, user})

        } catch (error) {
            
        }
    },

    async getUserDashboard(req, res) {
        try {
            const user = await User.findById(req.user._id)
            res.send({user, isAuth: true})
        } catch (error) {
            res.status(500).send(error)
        }
    },

    async addOrderToUserHistory(req, res, next) {
        
        try {
            let history = []

            req.body.order.products.forEach(item => {
                history.push({
                    _id: item._Id,
                    name: item.name,
                    description: item.description,
                    category: item.category,
                    quantity: item.count,
                    trasanction_id: req.body.order.trasanction_id,
                    amount: req.body.order.amount
                })
            })

            data = await User.findOneAndUpdate({_id: req.profile._id}, {$push: {history: histpry}}, {new: true})

            res.send(data)
        
        } catch (error) {
             res.status(400).json({error: 'Could not update user purchase history'});
        }

    },

    async purchaseHistory(req, res) {
        try {
            const orders = await Order.find({user: req.profile._id})
                                        .populate('user', '_id name')
                                        .sort('_created')

            res.status(200).send(orders)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

}



module.exports = {userController}

