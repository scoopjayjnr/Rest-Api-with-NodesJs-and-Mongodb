const mongoose = require('mongoose')
const Category = require("../models/Category")

exports.createCategory = async (request, response) => {
    try {
        if(!request.body.name){
            return response.status(422).json({ error: 'Name field required'})
        }

        const newCategory = await Category.create(request.body)
        return response.status(201).json(newCategory)
    } catch(error) {
        return response.status(500).json({ error: error.message})
    }
}

exports.getAllCategories = async (request, response) => {
    try{
        const products = await Category.find().select('-__v')
        return response.status(200).json(Categories)
    } catch (error) {
        return response.status(500).json({ error: error.message})
    }
}

exports.updateCategoryById = async (request, response) => {
    try{
        if (!mongoose.isValidObjectId(request.params.id)) {
            return response.status(422).json({error: 'Parameter not a Valid id'})
        }

        if(!await Category.exists({_id: request.params.id})) {
                    return response.status(404).json({ error: 'Category Not Found'})
                }
        
                const categoryUpdated = await Product.findByIdAndUpdate(request.params.id, request.body, {new: true})
        return response.status(200).json(categoryUpdated)
    }catch (error) {
        return response.status(500).json({ error: error.message})
    }
}

exports.deleteCategoryById = async (request, response) => {
    try{
        if(!mongoose.isValidObjectId(request.params.id)){
            return response.status(422).json({ error: 'Parameter is not a valid id'})
        }

        const category = await Category.findById(request.params.id)

        if(!category){
            return response.status(404).json({ error: 'Category Not Found'})
        }else{
            await product.deleteOne()
        }

        return response.status(204).send()
    }catch(error){
        return response.status(500).json({ error: error.message})
    }
}