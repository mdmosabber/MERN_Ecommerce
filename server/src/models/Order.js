const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    productList: [
      {
        type: ObjectId,
        ref: 'Product',
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// Create a model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
