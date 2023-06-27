const express = require('express');
const session = require('express-session');
const { register, login, users } = require('./userService.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		cookie: { secure: false },
		resave: false,
		saveUninitialized: true,
		secret: 'secret',
	}),
);

const homeTemplate = (user, users) => `<h1>Welcome, ${user || 'guest'}</h1>
${user === undefined ? '<p>Please,  <a href="/login">login here</a>. If you do not have an account, <a href="/register">please register</a></p>' : ''}
<ul>
    ${users.map(user => `<li>${user.username} - ${user.failedAttempts}</li>`).join('\n')}
</ul>`

app.get('/', (req, res) => {
	res.send(homeTemplate(req.session.user, users))
});

const registerTemplate = (error) => `<h1>Register</h1>
${error ? `<p>${error}</p>` : ''} 
<form action="/register" method="POST">
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Repeat password: <input type="password" name="repass"></label>
    <input type="submit" value="Sign up">
</form>`;

app.get('/register', (req, res) => {
	res.send(registerTemplate());
});

app.post('/register', async (req, res) => {
	try {
		if (req.body.username === '' || req.body.password === '') {
			throw new Error('All fields are required!');
		} else if (req.body.password !== req.body.repass) {
			throw new Error('Passwords do not match!');
		}

		await register(req.body.username, req.body.password);
		res.redirect('/');
	} catch (err) {
		res.send(registerTemplate(err.message));
	}
});

const loginTemplate = (error) => `<h1>Login</h1>
${error ? `<p>${error}</p>` : ''} 
<form action="/login" method="POST">
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <input type="submit" value="Sign in">
</form>`;

app.get('/login', (req, res) => {
	res.send(loginTemplate());
});

app.post('/login', async (req, res) => {

    try {
        const result = await login(req.body.username, req.body.password)
        req.session.user = result.username;
        res.redirect('/');
    } catch (err) {
        res.status(401).res.send(loginTemplate(err.message))
    }

});

app.listen(3000);
