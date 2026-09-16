const express = require('express');
const router = express.Router();
const { protect, instructor } = require('../middleware/authMiddleware');
const { getMyEnrollments, enrollCourse, getEnrolledStudents, unenrollCourse } = require('../controllers/enrollmentController');

router.get('/my-enrollments', protect, getMyEnrollments);
router.post('/', protect, enrollCourse);
router.get('/course/:courseId', protect, instructor, getEnrolledStudents);
router.delete('/:courseId', protect, unenrollCourse);

module.exports = router;
