import { get, post } from './api.js';
import { clearUserData, setUserData } from '../util.js';

export async function login(email, password) {
	const result = await post('/users/login', { email, password });
	const userData = {
		id: result._id,
		email: result.email,
		accessToken: result.accessToken,
	};
	setUserData(userData);

	return result;
}

export async function register(email, password) {
	const result = await post('/users/register', { email, password });
	const userData = {
		id: result._id,
		email: result.email,
		accessToken: result.accessToken,
	};
	setUserData(userData);

	return result;
}

export async function logout() {
	get('/users/logout');
	clearUserData();
}
