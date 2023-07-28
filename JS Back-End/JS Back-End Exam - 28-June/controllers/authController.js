const { register, login } = require('../services/userService.js');
const { parseError } = require('../util/parser.js');
const { isGuest, hasUser } = require('../middlewares/guards.js');

const authController = require('express').Router();

//////////////////////////////// REGISTER ////////////////////////////////
authController.get('/register', isGuest(), (req, res) => {
	res.render('register', {
		title: 'Register Page',
	});
});

authController.post('/register', isGuest(), async (req, res) => {
	const ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/i;	
		try {
			if (req.body.username == '' || req.body.password == '') {
				throw new Error('All fields are required');
			}

			if (ALPHANUMERIC_PATTERN.test(req.body.username) == false || ALPHANUMERIC_PATTERN.test(req.body.password) == false) {
				throw new Error('Username and password should consist only english letters and digits');
			}

			if (req.body.password.length < 3){
				throw new Error('The password should be at least 3 characters long')
			}

			if (req.body.password != req.body.repass) {
				throw new Error('Passwords do not match');
			}

			const token = await register(req.body.username, req.body.password);

			res.cookie('token', token, { httpOnly: true });
			res.redirect('/'); 
		} catch (error) {
			res.render('register', {
				title: 'Register Page',
				errors: parseError(error),
				body: req.body,
			});
		}
	},
);

//////////////////////////////// LOGIN ////////////////////////////////
authController.get('/login', isGuest(), (req, res) => {
	res.render('login', {
		title: 'Login Page',
	});
});

authController.post('/login', isGuest(), async (req, res) => {
	try {
		if (req.body.username == '' || req.body.password == '') {
			throw new Error('All fields are required');
		}

		if (req.body.password.length < 3){
			throw new Error('The password should be at least 3 characters long')
		}

		const token = await login(req.body.username, req.body.password);

		res.cookie('token', token, { httpOnly: true });
		res.redirect('/');
	} catch (error) {
		res.render('login', {
			title: 'Login Page',
			errors: parseError(error),
			body: req.body,
		});
	}
});

//////////////////////////////// LOGOUT ////////////////////////////////
authController.get('/logout', hasUser(), (req, res) => {
	res.clearCookie('token');
	res.redirect('/');
});

module.exports = authController;
