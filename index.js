const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// tell it to use the public directory as one where static files live
app.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => {
		const params = {error: undefined};
		res.render('signin', params);
	})
	.post('/login', getLogin)
	.post('/create_account', getsignup)
	.get('/signup', (req, res) => {
		const params = {error: undefined};
		res.render('signup', params);
	})
	.listen(port, function() {
		console.log('Node app is running on port', port);
	});

function getLogin(req, res) {
	let username = req.body.username;
	let password = req.body.password;  

	const params = {username};
	res.redirect('home.html');
}

function getsignup(req, res) {
	let username = req.body.username;
	let password = req.body.password;  

	const params = {error: 'Oops! You just made an account. This isn\'t actually an error.', username: username};
	res.render('signin', params);
}