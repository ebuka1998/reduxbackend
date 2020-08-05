const {Category} = require('../../models/Category')
const {Product} = require('../../models/Product')



const categoryController = {
    async categoryById(req, res) {
        try {
            category = await Category.findById()
            res.send(category)
        } catch (error) {
            res.status(400).send(error)
        }
    },   

    async create(req, res) {
       try {
            const category = new Category(req.body)
            await category.save()

            res.send(category)
       } catch (error) {
            res.status(400).send(error)
       }
    },

    async list(req, res) {
        try {
            const categories = await Category.find()
            res.send(categories)
        } catch (error) {
            res.status(400).send(error)
        }
    }


}

module.exports = {categoryController}


// exports.update = (req, res) => {
//     console.log('req.body', req.body);
//     console.log('category update param', req.params.categoryId);

//     const category = req.category;
//     category.name = req.body.name;
//     category.save((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             });
//         }
//         res.json(data);
//     });
// };

// exports.remove = (req, res) => {
//     const category = req.category;
//     Product.find({ category }).exec((err, data) => {
//         if (data.length >= 1) {
//             return res.status(400).json({
//                 message: `Sorry. You cant delete ${category.name}. It has ${data.length} associated products.`
//             });
//         } else {
//             category.remove((err, data) => {
//                 if (err) {
//                     return res.status(400).json({
//                         error: errorHandler(err)
//                     });
//                 }
//                 res.json({
//                     message: 'Category deleted'
//                 });
//             });
//         }
//     });
// };



