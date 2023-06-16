const router = require('express').Router();
const {verifyToken, isAdmin} = require('../middleware/auth');
const productController = require('../controllers/productController');
const {upload} = require('../utils/fileUpload');


router.post('/product',verifyToken,isAdmin,upload.single("image"),productController.create);
router.put('/product/:id',verifyToken,isAdmin,upload.single("image"),productController.update);
router.get('/products', productController.view);
router.get('/product/:id', productController.viewById);
router.delete('/product/:id',verifyToken,isAdmin,productController.delete);


router.get("/braintree/token", productController.getToken);
router.post("/braintree/payment", verifyToken, productController.processPayment);
router.put("/order-status/:orderId", verifyToken, isAdmin, productController.orderStatus);


module.exports = router;