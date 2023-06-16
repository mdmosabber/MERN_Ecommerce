const router = require('express').Router();
const authController = require('../controllers/authController');
const {verifyToken, isAdmin} = require('../middleware/auth');



router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/admin-check', verifyToken, authController.adminCheck);

// Protected route
router.put('/update-profile',verifyToken, authController.updateProfile);







module.exports = router;