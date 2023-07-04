const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const JWT_SECRET ='8045893d77e5a708825a492b312be061af31551e6b523ad92cd99fb1225f44f2';

async function register(email, firstName, lastName, password) {
	const existingEmail = await User.findOne({ email });
	if (existingEmail) {
		throw new Error('Email already exists');
	}

	if (password.length < 5) {
		throw new Error('Password must be at least 5 characters long');
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		email,
		firstName,
		lastName,
		hashedPassword,
	});

	return createSession(user);
}

async function login(email, password) {
	if (password.length < 5) {
		throw new Error('Password must be at least 5 characters long');
	}

	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('Incorrect email or password');
	}

	const hasUser = await bcrypt.compare(password, user.hashedPassword);
	if (!hasUser) {
		throw new Error('Incorrect email or password');
	}

	return createSession(user);
}

function createSession({ _id, email, firstName, lastName, }) {
	const payload = {
		_id,
		email,
		firstName,
		lastName,
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
