const Course = require('../models/Course');

const createCourse = async (req, res) => {
    try {
        const { title, description, content } = req.body;
        const course = await Course.create({
            title,
            description,
            content,
            instructor: req.user._id 
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate('instructor', 'name email');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getInstructorCourses = async (req, res) => {
    try {
        const courses = await Course.find({ instructor: req.user._id });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
          //  Make sure they own it before updating
        if (course.instructor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only edit your own courses' });
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } 
        );
        
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Make sure they own it before deleting
        if (course.instructor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only delete your own courses' });
        }

        await course.deleteOne();
        res.json({ message: 'Course removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCourse, getCourses, getInstructorCourses, updateCourse, deleteCourse };