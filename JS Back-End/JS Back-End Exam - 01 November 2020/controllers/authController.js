const { body, validationResult } = require('express-validator');
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

authController.post(
	'/register', isGuest(),
	body('username')
		.isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
		.isAlphanumeric().withMessage('Username may contain only english letters and digits'),
	body('password')
		.isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
		.isAlphanumeric().withMessage('Password may contain only english letters and digits'),
	async (req, res) => {
		try {
			const { errors } = validationResult(req);
            if (errors.length > 0){
                throw errors;
            }

			if (req.body.password != req.body.repass) {
				throw new Error('Passwords do not match');
			}

			const token = await register(req.body.username, req.body.password);

			res.cookie('token', token, { httpOnly: true });
			res.redirect('/'); // ПРОВЕРИ НАКЪДЕ ТРЯБВА ДА СЕ РЕДИРЕКТНЕ СЛЕД УСПЕШЕН Register
		} catch (error) {
			res.render('register', {
				title: 'Register Page',
				errors: parseError(error),
				body: req.body
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

		const token = await login(req.body.username, req.body.password);

		res.cookie('token', token, { httpOnly: true });
		res.redirect('/'); // ПРОВЕРИ НАКЪДЕ ТРЯБВА ДА СЕ РЕДИРЕКТНЕ СЛЕД УСПЕШЕН Login
	} catch (error) {
		res.render('login', {
			title: 'Login Page',
			errors: parseError(error),
			body: req.body
		});
	}
});

//////////////////////////////// LOGOUT ////////////////////////////////
authController.get('/logout', hasUser(), (req, res) => {
	res.clearCookie('token');
	res.redirect('/');
});

module.exports = authController;
