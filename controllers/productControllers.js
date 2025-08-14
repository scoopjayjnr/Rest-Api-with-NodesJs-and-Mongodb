const mongoose = require('mongoose')
const Product = require("../models/Product")
const Category = require('../models/Category')
const { request, response } = require('express')

exports.createProduct = async (request, response) => {
    try {
        if(!request.body.name){
            return response.status(422).json({ error: 'Name field required'})
        }

        if(!request.body.price){
            return response.status(422).json({ error: 'Price field required'})
        }

        if(!request.body.category){
            return response.status(422).json({ error: 'Category field required'})
        } else if (!await Category.findById(request.body.category)) {
            return response.status(422).json({ error: `Category mot Found`})
        }

        const newProduct = await Product.create(request.body)
        return response.status(201).json(newProduct)
    } catch(error) {
        return response.status(500).json({ error: error.message})
    }
}

exports.getAllProducts = async (request, response) => {
    try{
        const products = await Product.find().select('-__v').populate({ path: 'category', select: '_id name'})
        return response.status(200).json(products)
    } catch (error) {
        return response.status(500).json({ error: error.message})
    }
}

exports.getProductsById = async (request, response) => {
    try{
        if (!mongoose.isValidObjectId(request.params.id)) {
            return response.status(422).json({error: 'Parameter not a Valid id'})
        }

        const product = await Product.findById(request.params.id).select('-__v').populate({ path: 'category', select: '_id name'})
        if (!product) {
            return response.status(404).json({ error: 'Product Not Found'})
        }
        return response.status(200).json(product)
    }catch (error) {
        return response.status(500).json({ error: error.message})
    }
}

exports.getProductsByCategory = async (request, response) => {
    try{
        if(!await Category.findById(request.params.categoryId)) {
            return response.status(404).json({ error: 'Category Not Found'})
        }

        const products = await Product.find({ category: request.params.categoryId}).select('-__v').populate({ path: 'category', select: '_id name'})

        return response.status(200).json({ error: error.message})
    } catch (error){
        return response.status(500).json({ error: error.message})
    }
}

exports.updateProductsById = async (request, response) => {
    try{
        if (!mongoose.isValidObjectId(request.params.id)) {
            return response.status(422).json({error: 'Parameter not a Valid id'})
        }

        if(!await Product.exists({_id: request.params.id})) {
            return response.status(404).json({ error: 'Product Not Found'})
        }

        const productUpdated = await Product.findByIdAndUpdate(request.params.id, request.body, {new: true})
        return response.status(200).json(productUpdated)
    }catch (error) {
        return response.status(500).json({ error: error.message})
    }
}

exports.deleteProductsById = async (request, response) => {
    try{
        if(!mongoose.isValidObjectId(request.params.id)){
            return response.status(422).json({ error: 'Parameter is not a valid id'})
        }

        const product = await Product.findById(request.params.id)

        if(!product){
            return response.status(404).json({ error: 'Product Not Found'})
        }else{
            await product.deleteOne()
        }

        return response.status(204).send()
    }catch(error){
        return response.status(500).json({ error: error.message})
    }
}