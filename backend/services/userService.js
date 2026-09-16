const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (name, email, password, role) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password,
        role: role || 'student'
    });
    if (user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
        };
    }
    throw new Error('Invalid user data');
};

const authenticate = async (email, password) => {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
        };
    }
    throw new Error('Invalid email or password');
};

const googleAuthenticate = async (credential) => {
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { name, email } = payload;

    let user = await User.findOne({ email });

    if (user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
            isNew: false
        };
    } else {
        const randomPassword = Math.random().toString(36).slice(-8) + Date.now();
        user = await User.create({
            name,
            email,
            password: randomPassword, 
            role: 'student' 
        });
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
            isNew: true
        };
    }
};

const addInstructorService = async (name, email, password, securityCode) => {
    if (securityCode !== process.env.INSTRUCTOR_SECRET) {
        throw new Error('Invalid Admin Security Code');
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }
    await User.create({
        name,
        email,
        password,
        role: 'instructor' 
    });
};

const changeUserPassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!(await user.matchPassword(oldPassword))) {
        throw new Error('Incorrect current password');
    }
    user.password = newPassword; 
    await user.save(); 
};

const getAllInstructorsService = async () => {
    return await User.find({ role: 'instructor' }).select('-password -__v');
};

module.exports = {
    register,
    authenticate,
    googleAuthenticate,
    addInstructorService,
    changeUserPassword,
    getAllInstructorsService
};
