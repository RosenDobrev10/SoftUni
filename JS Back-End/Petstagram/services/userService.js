const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const JWT_SECRET = '0a1d366b27c939a67639c8d94f18b33c0b97e916c04fbba0ddf01a081b70a2d2';

async function register(username, email, password) {
	const existingEmail = await User.findOne({ email }); 
	const existingUsername = await User.findOne({ username })
	if (existingEmail || existingUsername) {                                  
		throw new Error('Email or username already exists'); 
	}

	if (password.length < 4) {                      
		throw new Error('The password should be at least 4 characters long');
	}

	const hashedPassword = await bcrypt.hash(password, 10); 

	const user = await User.create({                        
		username,
		email,
		hashedPassword,
	});

	return createSession(user);                             
}

async function login(username, password) {
	if (password.length < 4) {                     
		throw new Error('The password should be at least 4 characters long');
	}

	const user = await User.findOne({ username });  
	if (!user) {                                    
		throw new Error('Incorrect username or password');    
	}

	const hasMatch = await bcrypt.compare(password, user.hashedPassword);   

	if (!hasMatch) {                                                       
		throw new Error('Incorrect username or password');               
	}

	return createSession(user);                                            
}

function createSession({ _id, username, email }) {
	const payload = {                                                      
		_id,
		username,
		email
	};

	return jwt.sign(payload, JWT_SECRET, { expiresIn: '2d' });            
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
	register,
	login,
	verifyToken,
};
