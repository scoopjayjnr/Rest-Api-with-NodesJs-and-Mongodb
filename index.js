const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/Product")

const app = express()

app.use(express.json())

mongoose.connect('mongodb+srv://test:test123@cluster0.7pnuihk.mongodb.net/my_api')
mongoose.connection.on('connected', () => {
    console.log('Mongoose Connected');
    app.listen(3000, () => console.log('Server is listening on 3000'))
})

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection error: ', error);
    
})

app.post('/products', async (request, response) => {
    try {
        if(!request.body.name){
            return response.status(422).json({ error: 'Name field required'})
        }

        if(!request.body.price){
            return response.status(422).json({ error: 'Price field required'})
        }

        if(!request.body.category){
            return response.status(422).json({ error: 'Category field required'})
        } else if (!Product.schema.path('category').enumValues.includes(request.body.category)) {
            return response.status(422).json({ error: `Category must be one of these options: ${Product.schema.path('category').enumValues.join(', ')}`})
        }

        const newProduct = await Product.create(request.body)
        return response.status(201).json(newProduct)
    } catch(error) {
        return response.status(500).json({ error: error.message})
    }
})

app.get('/products', async (request, response) => {
    try{
        const products = await Product.find().select('-__v')
        return response.status(200).json(products)
    } catch (error) {
        return response.status(500).json({ error: error.message})
    }
})

app.get('/products/:id', async (request, response) => {
    try{
        if (!mongoose.isValidObjectId(request.params.id)) {
            return response.status(422).json({error: 'Parameter not a Valid id'})
        }

        const product = await Product.findById(request.params.id).select('-__v')
        if (!product) {
            return response.status(404).json({ error: 'Product Not Found'})
        }
        return response.status(200).json(product)
    }catch (error) {
        return response.status(500).json({ error: error.message})
    }
})