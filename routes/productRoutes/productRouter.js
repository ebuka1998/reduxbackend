
const express = require('express')
const router = express.Router()


const authorize = require('../../middlewares/authorize')
const {productController} = require('./productController')
const isAdmin = require('../../middlewares/isAdmin')


router.post('/product/create',authorize, productController.create)

router.post('/product/addtocart', productController.addToCart)

router.get('/products', productController.listProducts)

router.get('/product/:id', productController.productById)

// router.get('/products/categories', productController.listCategories)

// router.get('/products/by/search', productController.listBySearch);


module.exports = router


// router.get("/product/:productId", read);
// router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
// router.delete(
//     "/product/:productId/:userId",
//     requireSignin,
//     isAuth,
//     isAdmin,
//     remove
// );
// router.put(
//     "/product/:productId/:userId",
//     requireSignin,
//     isAuth,
//     isAdmin,
//     update
// );
























