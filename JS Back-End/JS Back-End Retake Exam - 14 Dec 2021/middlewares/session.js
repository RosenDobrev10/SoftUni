const { verifyToken } = require('../services/userService.js');

module.exports = () => (req, res, next) => {
	const token = req.cookies.token;

	if (token) {
		try {
			const userData = verifyToken(token);
            req.user = userData;
			res.locals.username = userData.username;
			res.locals.address = userData.address;
		} catch (error) {
            res.clearCookie('token');
            return res.redirect('/404');
        }
	}

	next();
};
