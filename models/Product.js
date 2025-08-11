const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description : String,
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Books', 'Appliances']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)