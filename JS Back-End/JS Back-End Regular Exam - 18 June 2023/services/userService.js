const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const JWT_SECRET = '3c2f06decfb02cb1a4514ad3a2ddb738214df2edc549051cc2a706527be4f811';

async function register(email, password) {
	const existingEmail = await User.findOne({ email }); 	
	if (existingEmail) {                   
		throw new Error('Email already exists !'); 
	}

	if (password.length < 4) {                      
		throw new Error('The password is required and should be at least 4 characters long.');
	}

	const hashedPassword = await bcrypt.hash(password, 10); 

	const user = await User.create({                        
		email,
		hashedPassword,
	});

	return createSession(user);                             
}

async function login(email, password) {
	if (password.length < 4) {                      
		throw new Error('The password is required and should be at least 4 characters long.'); 
	}

	const user = await User.findOne({ email });  
	if (!user) {                                    
		throw new Error('Incorrect email or password');    
	}

	const hasMatch = await bcrypt.compare(password, user.hashedPassword);   
	if (!hasMatch) {                                                       
		throw new Error('Incorrect email or password');                
	}

	return createSession(user);                                             
}

function createSession({ _id, email }) {
	const payload = {                                                       
		_id,
		email,
	};

	return jwt.sign(payload, JWT_SECRET, { expiresIn: '2d'});                                 
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
	register,
	login,
	verifyToken,
};

