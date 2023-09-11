const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const JWT_SECRET = '0a1d366b27c939a67639c8d94f18b33c0b97e916c04fbba0ddf01a081b70a2d2';

async function register(username, password, address) {
	const existingUsername = await User.findOne({ username }); // Проверяваме по email, дали вече има такъв
	if (existingUsername) {                                    // Ако намерим съвпадение
		throw new Error('Username already exists'); // Хвърляме грешка
	}

	if (password.length < 3) {                      // Ако намерим съвпадение
		throw new Error('The password should be at least 3 characters long'); // Хвърляме грешка
	}

	const hashedPassword = await bcrypt.hash(password, 10); // Хешираме паролата, като подаваме паролата във вида подадена от потребителя и я осоляваме 10 пъти

	const user = await User.create({                        // Създаваме потребителя в базата данни с username и хеширана парола 
		username,
		hashedPassword,
		address
	});

	return createSession(user);                             // Създаваме сесия на потребителя
}

async function login(username, password) {
	if (password.length < 3) {                      // Ако намерим съвпадение
		throw new Error('The password should be at least 3 characters long'); // Хвърляме грешка
	}

	const user = await User.findOne({ username });  // Проверяваме по username, дали вече има такъв
	if (!user) {                                    // Ако няма регистриран такъв user
		throw new Error('Incorrect username or password');    // Хвърляме грешка 
	}

	const hasMatch = await bcrypt.compare(password, user.hashedPassword);   // Сравняваме подадената парола с хешираната от намерения user 

	if (!hasMatch) {                                                        // Ако няма съвпадение 
		throw new Error('Incorrect username or password');                // Хвърляме грешка 
	}

	return createSession(user);                                             // Създаваме сесия на потребителя
}

function createSession({ _id, username, address }) {
	const payload = {                                                       // Това са данните, които искаме да запазим в токена
		_id,
		username,
		address
	};

	return jwt.sign(payload, JWT_SECRET, {expiresIn: '2d'});            // Връщаме подписан токена като се дават записани данни и тайната 
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
