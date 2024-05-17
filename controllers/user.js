const User = require('../models/user');

async function handleSignupUser(req, res) {
    const { name, email, password } = req.body;

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'User already registered' });
    }

    // Check if password length is less than 7 characters
    if (password.length < 7) {
        return res.status(400).json({ error: 'Password should be at least 7 characters long' });
    }

    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ error: 'Password should contain at least one uppercase letter' });
    }

    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return res.status(400).json({ error: 'Password should contain at least one lowercase letter' });
    }

    // Check if password contains at least one special character
    if (!/[^a-zA-Z0-9]/.test(password)) {
        return res.status(400).json({ error: 'Password should contain at least one special character' });
    }

    // If all validations pass, insert user into the database
    try {
        await User.create({ name, email, password });
        res.json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleLoginUser(req, res) {
    // Implement login functionality here
}

module.exports = {
    handleSignupUser,
    handleLoginUser
};
