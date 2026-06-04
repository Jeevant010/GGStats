const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { getToken } = require('../utils');
const { jwtSecret } = require('../config/env');

const findExistingUser = async (email) => {
    return User.findOne({ email });
};

const findUserByEmailWithPassword = async (email) => {
    return User.findOne({
        email: email.trim()
    }).select('+password');
};

const findUserByIdWithoutPassword = async (id) => {
    return User.findById(id).select('-password');
};

const findUserByIdWithPassword = async (id) => {
    return User.findById(id).select('+password');
};

const createUser = async ({ userName, email, phone, password }) => {
    const newUser = await User.create({
        userName,
        email,
        ...(phone && { phone }),
        password
    });
    return newUser;
};

const generateRegisterToken = async (email, user) => {
    return getToken(email, user);
};

const generateLoginToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        jwtSecret,
        { expiresIn: '30d' }
    );
};

const comparePassword = async (plain, hashed) => {
    return bcrypt.compare(plain, hashed);
};

const changeUserPassword = async (userId, oldpassword, newPassword) => {
    const user = await User.findById(userId).select('+password');
    if (!user) return { success: false, reason: 'not_found' };

    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) return { success: false, reason: 'wrong_password' };

    if (newPassword.length < 8) return { success: false, reason: 'too_short' };

    user.password = newPassword;
    await user.save();
    return { success: true };
};

module.exports = {
    findExistingUser,
    findUserByEmailWithPassword,
    findUserByIdWithoutPassword,
    findUserByIdWithPassword,
    createUser,
    generateRegisterToken,
    generateLoginToken,
    comparePassword,
    changeUserPassword,
};
