const authorize =  require('../../middlewares/authorize');
const express = require('express')
const router = express.Router()

const {categoryController} = require('./categoryController')
const isAdmin = require('../../middlewares/isAdmin')



router.get('/category/:categoryId', categoryController.categoryById)

router.get('/categories', categoryController.list)

router.post('/category/create', authorize, categoryController.create)

//middleware of isAdmin authorize should be here

module.exports = router
/**
 * router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
// router.put('/category/:categoryUpdateId/:userId', requireSignin, isAuth, isAdmin, update);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);

router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userById);
 */