const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Enter Your Product Title'],
            trim: true,
            maxLength: 160
        },
        description: {
            type: String,
            required: [true, 'Enter Your Product Description'],
            maxLength: 2000
        },
        price: {
            type: Number,
            trim: true,
            required: [true, 'Enter Your Product Price'],
        },
        image: {
            type: String, 
            required: [true, 'Upload an image'],
        },
        quantity: {
            type: Number,
            required: [true, 'Enter Your Product Quantity'],
        }
    },
    { timestamps: true, versionKey: false }
);




//create model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;