module.exports = () => (req, res, next) => {
	if (req.body) {
		for (let key in req.body) {
			req.body[key] = req.body[key].trim();
		}
	}
	next();
};
