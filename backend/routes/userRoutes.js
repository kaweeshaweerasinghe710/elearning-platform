const express = require('express');
const router = express.Router();
const { registerUser, verifyEmail, authUser, googleAuth, changePassword, getAllInstructors } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/verify-email', verifyEmail);
router.post('/login', authUser);
router.post('/google', googleAuth); 

router.put('/change-password', protect, changePassword);
router.get('/instructors', getAllInstructors);

module.exports = router;