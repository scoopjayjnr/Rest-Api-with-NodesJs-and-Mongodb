const router = require("express").Router()
const productController = require('../controllers/productControllers')


router.post('/products', productController.createProduct)

router.get('/products', productController.getAllProducts)

router.get('/products/:id', productController.getProductsById)

router.get('/products/category/categoryId', productController.getProductsByCategory)

router.put('/products/:id', productController.updateProductsById)

router.delete('/products/:id', productController.deleteProductsById)

module.exports = router 