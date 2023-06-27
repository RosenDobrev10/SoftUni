const bcrypt = require('bcrypt');

const users = [];

async function register(username, password) {
	if (users.find((user) => user.username.toLowerCase() === username.toLowerCase(),)) {
		throw new Error('Username is taken!');
	}

	const user = {
		username,
		hashedPassword: await bcrypt.hash(password, 10),
		failedAttempts: 0,
	};

	users.push(user);
}

async function login(username, password) {
	const user = users.find((user) => user.username.toLowerCase() === username.toLowerCase(),);

	if (!user) {
		throw new Error('Incorrect username or password!')
	} else {
		if (user.failedAttempts >= 3){
			throw new Error('User profile is in lockdown. Please contact admins.')
		}
		const success = await bcrypt.compare(password, user.hashedPassword);
		if (success) {
			user.failedAttempts = 0;
			return user;
		} else {
			user.failedAttempts++;
			throw new Error('Incorrect username or password!')
		}
	}
}

module.exports = {
	users,
	register,
	login,
};
