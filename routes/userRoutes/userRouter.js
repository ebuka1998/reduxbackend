const express = require('express')
const router = express.Router()


const authorize = require('../../middlewares/authorize')
const {userController} = require('./userController')


router.post('/register', userController.createUser)

router.post('/login', userController.signInUser)

router.get('/me', authorize, userController.getUserDashboard)

router.get('/orders/by/user/:userId', authorize, userController.purchaseHistory);


module.exports = router
