const app = require('express')();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const secret = 'secret';

app.use(cookieParser());
app.use((req, res, next) => {
	const token = req.cookies.token;

	if (token) {
		try {
			const data = jwt.verify(token, secret); // Разчитаме данните от tokena, като подаваме токена и след сикрета и ни връща данните
			req.user = data;
		} catch (err) {
            res.cookies('token', '');
            res.redirect('/login');
        }
	}
	next();
});

app.get('/', (req, res) => {
	if (req.user) {
		res.send('Hello, ' + req.user.username);
	} else {
		res.send('Hello, guest');
	}
});

app.get('/jwt', (req, res) => {
	const payload = {
		// Информация, която искаме да запишем в token
		username: 'Peter',
		roles: ['user', 'admin'],
	};

	const token = jwt.sign(payload, secret); // Изпращаме информацията и след това сикрета
	res.cookie('token', token); // с Responsa сетваме cookie, със име като 1 парам и създадения токен като 2 парам
	res.send('Token saved!');
});

app.listen(3000);
