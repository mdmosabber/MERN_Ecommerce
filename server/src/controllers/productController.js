const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Order = require("../models/Order");

const braintree = require("braintree");
require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});



// Create Product
exports.create = async (req, res) => {

    try {
        const { title, description, price, quantity } = req.body;
        const { filename } = req.file;

        if (!title) {
            return res.json({ error: 'Title is required' });
        }
        if (!description) {
            return res.json({ error: 'Description is required' });
        }
        if (!price) {
            return res.json({ error: 'Price is required' });
        }
        if (!quantity) {
            return res.json({ error: 'Quantity is required' });
        }
        if (req.file && req.file.size > 2000000) {
            return res.json({ error: 'Image size should be less than 2mb' });
        }

        const imagePath = path.join('public/images', filename); 

        const product = await new Product({
            title,
            description,
            price,
            quantity,
            image: imagePath,
        }).save();

        res.json({ status: 'success', product });

    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Error creating product' });
    }
};



// Get All Product
exports.view = async (req, res)=> {  
    try {
        const products = await Product.find({});

        res.json({ status: 'success', products })        
        
    } catch (error) {
        console.error('Error fatching product:', error);
        res.status(500).json({ error: 'Error fatching product' });
    }
}


//View Product By ID
exports.viewById = async(req, res)=> {
    try {
        const product = await Product.findById(req.params.id);
        
        res.json({ status: 'success', product });    

    } catch (error) {
        console.error('Error fatching product by id:', error);
        res.status(500).json({ error: 'Error fatching product by id' });
    }
}



//Product Update By Id
exports.update = async (req, res) => {
  try {
    const { title, description, price, quantity } = req.body;
    const { filename } = req.file;

    if (!title) {
      return res.json({ error: 'Title is required' });
    }
    if (!description) {
      return res.json({ error: 'Description is required' });
    }
    if (!price) {
      return res.json({ error: 'Price is required' });
    }
    if (!quantity) {
      return res.json({ error: 'Quantity is required' });
    }
    if (req.file && req.file.size > 1000000) {
      return res.json({ error: 'Image size should be less than 1mb' });
    }

    const imagePath = path.join('public/images', filename);

    // Delete the previous image file if it exists
    const previousProduct = await Product.findById(req.params.id);

    if (previousProduct && previousProduct.image) {
      const previousImagePath = path.join('src',previousProduct.image);

      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price,
        quantity,
        image: imagePath,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ status: 'success', updatedProduct });

  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
};



//Product Delete By Id
exports.delete = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.json({ error: 'Product not found' });
    }

    if (product.image) {
      const imagePath = path.join('src', product.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ status: 'success' });
    
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
};





exports.getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};




exports.processPayment = async (req, res) => {
  try {
    console.log(req.body);
    const { nonce, cart } = req.body;

    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    // console.log("total => ", total);

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
        
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();

          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};





exports.orderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("buyer", "email name");
    // send email

    // prepare email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: order.buyer.email,
      subject: "Order status",
      html: `
        <h1>Hi ${order.buyer.name}, Your order's status is: <span style="color:red;">${order.status}</span></h1>
        <p>Visit <a href="${process.env.CLIENT_URL}/dashboard/user/orders">your dashboard</a> for more details</p>
      `,
    };

    try {
      await sgMail.send(emailData);
    } catch (err) {
      console.log(err);
    }

    res.json(order);
  } catch (err) {
    console.log(err);
  }
};