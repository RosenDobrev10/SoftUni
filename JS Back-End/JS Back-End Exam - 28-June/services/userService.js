const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const JWT_SECRET = '3c2f06decfb02cb1a4514ad3a2ddb738214df2edc549051cc2a706527be4f811';

async function register(username, password) {
	const existing = await User.findOne({ username }); 
	if (existing) {                                   
		throw new Error('Username already exists');  
	}

	const hashedPassword = await bcrypt.hash(password, 10); 

	const user = await User.create({                        
		username,
		hashedPassword,
	});

	return createSession(user);                            
}

async function login(username, password) {
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

function createSession({ _id, username }) {
	const payload = {                                                       
		_id,
		username,
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

// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
// Изпълнява се в терминала и генерира 64 bit ASCII string
