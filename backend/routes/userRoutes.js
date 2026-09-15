const express = require('express');
const router = express.Router();
const { registerUser, authUser, googleAuth, addInstructor, changePassword, getAllInstructors } = require('../controllers/userController');
const { protect, instructor } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/google', googleAuth); 

router.post('/add-instructor', protect, instructor, addInstructor);
router.put('/change-password', protect, changePassword);
router.get('/instructors', getAllInstructors);

module.exports = router;