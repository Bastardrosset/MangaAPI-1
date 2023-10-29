const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
    try {
        const {pseudo, email, password} = req.body
        
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await User.create({
            pseudo,
            email,
            password: hashedPassword, 
        });

        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Registration failed' });
    }
}

module.exports.signin = async (req, res) => {
     try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign(
                { userId: user.id, 
                    email: user.email 
                }, 
                process.env.SECRET_KEY, 
                { expiresIn: '1h' }
            );

        return res.status(200).json({ message: 'User authenticated successfully', token });
    } catch (error) {
        console.error('Signin error:', error);
        return res.status(500).json({ message: 'Authentication failed' });
    }
};

module.exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization; 
    
            return res.status(200).json({ message: 'User logged out successfully' });

    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Logout failed' });
    }
};
