const express = require('express');
const router = express.Router();
const { registerUser, authUser, googleAuth, addInstructor, changePassword } = require('../controllers/userController');
const { protect, instructor } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/google', googleAuth); 

router.post('/add-instructor', protect, instructor, addInstructor);
router.put('/change-password', protect, changePassword);

module.exports = router;