function hasUser() {
	return (req, res, next) => {
		if (req.user) {
			next();
		} else {
			res.redirect('/auth/login');	// Проверяваме накъде се редиректва според заданието в секцията за guards
		}
	};
}

function isGuest() {
	return (req, res, next) => {
		if (req.user) {
			res.redirect('/');  // Проверяваме накъде се редиректва според заданието в секцията за guards
		} else {
			next();
		}
	};
}

module.exports = {
    hasUser,
    isGuest,
};
