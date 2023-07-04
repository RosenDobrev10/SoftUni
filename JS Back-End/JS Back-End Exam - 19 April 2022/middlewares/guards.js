function isLogged() {
	return (req, res, next) => (req.user ? next() : res.redirect('/auth/login'));
}

function isGuest() {
	return (req, res, next) => (req.user ? res.redirect('/') : next());
}

module.exports = {
	isLogged,
	isGuest,
};
