const express = require("express")
const mongoose = require("mongoose")

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

app.use(require('./routes/productsRoute'))
app.use(require('./routes/categoriesRoute'))