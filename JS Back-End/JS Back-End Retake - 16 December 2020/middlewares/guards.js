function hasUser() {
	return (req, res, next) => {
		if (req.user) {
			next();
		} else {
			res.redirect('/auth/login');
		}
	};
}

function isGuest() {
	return (req, res, next) => {
		if (req.user) {
			res.redirect('/');  // Проверяваме накъде се редиректва според заданието
		} else {
			next();
		}
	};
}

module.exports = {
    hasUser,
    isGuest,
};
