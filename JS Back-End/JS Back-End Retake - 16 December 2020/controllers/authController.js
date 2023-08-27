const { hasUser, isGuest } = require('../middlewares/guards.js');
const { register, login } = require('../services/userService.js');
const { parseError } = require('../util/parser.js');

const authController = require('express').Router();

//////////////////////////////// REGISTER ////////////////////////////////
authController.get('/register', isGuest(), (req, res) => {
	res.render('register', {
        title: 'Register Page',
    });
});

authController.post('/register', isGuest(), async (req, res) => {
	try {
        if (req.body.email == '' || req.body.username == '' || req.body.password == ''){
            throw new Error('All fields are required');
        }

        if (req.body.password !== req.body.repass){
            throw new Error('Passwords do not match');
        }

		const token = await register(req.body.email, req.body.username, req.body.password);

		res.cookie('token', token, { httpOnly: true });
		res.redirect('/');  // ПРОВЕРИ НАКЪДЕ ТРЯБВА ДА СЕ РЕДИРЕКТНЕ СЛЕД УСПЕШЕН Register
	} catch (error) {
        res.render('register', {
            title: 'Register Page',
            errors: parseError(error),
            body: req.body,
        });
    }
});

//////////////////////////////// LOGIN ////////////////////////////////
authController.get('/login', isGuest(), (req, res) => {
    res.render('login', {
        title: 'Login Page'
    });
})

authController.post('/login', isGuest() ,async (req, res) => {
    try {
        if (req.body.email == '' || req.body.password == ''){
            throw new Error('All fields are required');
        }

		const token = await login(req.body.email, req.body.password);

		res.cookie('token', token, { httpOnly: true });
		res.redirect('/');  // ПРОВЕРИ НАКЪДЕ ТРЯБВА ДА СЕ РЕДИРЕКТНЕ СЛЕД УСПЕШЕН Login
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
})

module.exports = authController;
