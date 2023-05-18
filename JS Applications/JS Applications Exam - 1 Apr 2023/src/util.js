export function getUserData() {
	return JSON.parse(sessionStorage.getItem('user'));
}

export function setUserData(data) {
	sessionStorage.setItem('user', JSON.stringify(data));
}

export function clearUserData() {
	sessionStorage.removeItem('user');
}

export function getAccessToken() {
	const user = getUserData();
	if (user) {
		return user.accessToken;
	} else {
		return null;
	}
}

export function createSubmitHandler(ctx, handler) {
	return function (event) {
		event.preventDefault();
		const formData = Object.fromEntries(new FormData(event.target));

		handler(ctx, formData, event);
	};
}
