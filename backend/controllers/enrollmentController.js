const User = require('../models/User');


const getMyEnrollments = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('enrolledCourses');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const formattedEnrollments = (user.enrolledCourses || []).map(course => ({
            _id: course._id, 
            course: course
        }));

        res.status(200).json(formattedEnrollments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch enrollments', error: error.message });
    }
};


const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.enrolledCourses) {
            user.enrolledCourses = [];
        }

        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: 'Already enrolled in this course.' });
        }

        user.enrolledCourses.push(courseId);
        await user.save();

        res.status(200).json({ message: 'Successfully enrolled!' });
    } catch (error) {
        console.error("Enrollment Error:", error);
        res.status(500).json({ message: 'Enrollment failed', error: error.message });
    }
};


const getEnrolledStudents = async (req, res) => {
    try {
        const { courseId } = req.params;
        const students = await User.find({ enrolledCourses: courseId }).select('name email createdAt');
        const formattedStudents = students.map(student => ({
            _id: student._id,
            student: student,
            createdAt: student.createdAt
        }));

        res.status(200).json(formattedStudents);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch students', error: error.message });
    }
};

module.exports = { getMyEnrollments, enrollCourse, getEnrolledStudents };
