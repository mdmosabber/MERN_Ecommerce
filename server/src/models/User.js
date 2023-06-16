const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Enter Your Name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email field is require'],
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Enter Your Password'],
            min: 6,
            max: 64
        },
        address: {
            type: String,
            trim: true,
            default: 'Dhaka'
        },
        role: {
            type: Number,
            default: 0
        }
    },
    {timestamps: true, versionKey:false}
);

// Create a model
const User = mongoose.model('User', userSchema);

module.exports = User;





