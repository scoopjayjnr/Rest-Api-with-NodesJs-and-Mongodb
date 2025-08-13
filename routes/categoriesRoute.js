const router = require("express").Router()
const categoriesController = require('../controllers/categoriesController')


router.post('/categories', categoriesController.createCategory)

router.get('/categories', categoriesController.getAllCategories)

router.put('/categories/:id', categoriesController.updateCategoryById)

router.delete('/categories/:id', categoriesController.deleteCategoryById)

module.exports = router