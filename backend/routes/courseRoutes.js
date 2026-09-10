const express = require('express');
const router = express.Router();
const { createCourse, getCourses, getInstructorCourses, updateCourse, deleteCourse } = require('../controllers/courseController');
const { protect, instructor } = require('../middleware/authMiddleware');


router.get('/', protect, getCourses);
router.post('/', protect, instructor, createCourse);
router.get('/instructor/my-courses', protect, instructor, getInstructorCourses);
router.put('/:id', protect, instructor, updateCourse);
router.delete('/:id', protect, instructor, deleteCourse);

module.exports = router;