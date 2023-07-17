const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const JWT_SECRET = '3c2f06decfb02cb1a4514ad3a2ddb738214df2edc549051cc2a706527be4f811';

async function register(email, password, skills) {
	const existingEmail = await User.findOne({ email }); // Проверяваме по email, дали вече има такъв
	if (existingEmail) {						// Ако намерим съвпадение
		throw new Error('Email already exists'); // Хвърляме грешка
	}

	if (password.length < 5) {
		throw new Error('The password should be at least 5 characters long'); // Хвърляме грешка
	}

	const hashedPassword = await bcrypt.hash(password, 10); // Хешираме паролата, като подаваме паролата във вида подадена от потребителя и я осоляваме 10 пъти

	const user = await User.create({	// Създаваме потребителя в базата данни с username и хеширана парола
		email,
		hashedPassword,
		skills,
	});

	return createSession(user); // Създаваме сесия на потребителя
}

async function login(email, password) {
	if (password.length < 5) {
		throw new Error('The password should be at least 5 characters long'); // Хвърляме грешка
	}

	const user = await User.findOne({ email }); // Проверяваме по username, дали вече има такъв
	if (!user) {										// Ако няма регистриран такъв user
		throw new Error('Incorrect email or password'); // Хвърляме грешка
	}

	const hasMatch = await bcrypt.compare(password, user.hashedPassword); // Сравняваме подадената парола с хешираната от намерения user

	if (!hasMatch) {										// Ако няма съвпадение
		throw new Error('Incorrect email or password'); // Хвърляме грешка
	}

	return createSession(user); // Създаваме сесия на потребителя
}

function createSession({ _id, email, skills }) {
	const payload = {	// Това са данните, които искаме да запазим в токена
		_id,
		email,
		skills,
	};

	return jwt.sign(payload, JWT_SECRET, { expiresIn: '2d' }); // Връщаме подписан токена като се дават записани данни и тайната
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