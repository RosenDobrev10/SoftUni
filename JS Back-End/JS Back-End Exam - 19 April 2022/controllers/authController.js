const { isGuest, isLogged } = require('../middlewares/guards.js');
const { register, login } = require('../services/userService.js');
const { parseError } = require('../util/parser.js');

const authController = require('express').Router();

/////////////////////////////////////////// REGISTER ///////////////////////////////////////////
authController.get('/register', isGuest(), (req, res) => {
	res.render('register', { title: 'Register Page' });
});

authController.post('/register', isGuest(), async (req, res) => {
	const { email, firstName, lastName, password, repass } = req.body;

	try {
        if (firstName == '' || lastName == '' || email == '' || password == '') {
            throw new Error('All fields are required');
        }
    
        if (password != repass) {
            throw new Error("Passwords don't match");
        }

		const token = await register(email, firstName, lastName, password);
		res.cookie('token', token, { httpOnly: true });
		res.redirect('/');
	} catch (error) {
		res.render('register', {
			title: 'Register Page',
			errors: parseError(error),
			body: req.body
		});
	}
});

///////////////////////////////////////// LOGIN ///////////////////////////////////////////////
authController.get('/login', isGuest(), (req, res) => {
	res.render('login', { title: 'Login Page' });
});

authController.post('/login', isGuest(), async (req, res) => {
	const { email, password } = req.body;

	try {
        if (email == '' || password == '') {
            throw new Error('All fields are required!');
        }

		const token = await login(email, password);
		res.cookie('token', token, { httpOnly: true });
		res.redirect('/');
	} catch (error) {
		res.render('login', {
			title: 'Login Page',
			errors: parseError(error),
			body: req.body
		});
	}
});

///////////////////////////////////////// LOGOUT ///////////////////////////////////////////////
authController.get('/logout', isLogged(), (req, res) => {
	res.clearCookie('token');
	res.redirect('/');
});

module.exports = authController;
