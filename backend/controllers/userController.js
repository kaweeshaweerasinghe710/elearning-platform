const userService = require('../services/userService');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const result = await userService.register(name, email, password, role);
        res.status(201).json(result);
    } catch (error) {
        const status = error.message === 'User already exists' ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.authenticate(email, password);
        res.json(result);
    } catch (error) {
        const status = error.message === 'Invalid email or password' ? 401 : 500;
        res.status(status).json({ message: error.message });
    }
};

const googleAuth = async (req, res) => {
    try {
        const { credential } = req.body; 
        const result = await userService.googleAuthenticate(credential);
        const status = result.isNew ? 201 : 200;
        delete result.isNew;
        res.status(status).json(result);
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Google Authentication Failed' });
    }
};

const addInstructor = async (req, res) => {
    try {
        const { name, email, password, securityCode } = req.body;
        await userService.addInstructorService(name, email, password, securityCode);
        res.status(201).json({ message: 'Instructor added successfully' });
    } catch (error) {
        let status = 500;
        if (error.message === 'Invalid Admin Security Code') status = 403;
        else if (error.message === 'User already exists') status = 400;
        res.status(status).json({ message: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        await userService.changeUserPassword(req.user._id, oldPassword, newPassword);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        const status = error.message === 'Incorrect current password' ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

const getAllInstructors = async (req, res) => {
    try {
        const instructors = await userService.getAllInstructorsService();
        res.json(instructors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, authUser, googleAuth, addInstructor, changePassword, getAllInstructors };
