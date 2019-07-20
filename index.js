const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 5000;

let sessions=new Map();// session -> user_id
function GUID(){
	return 'X-'+('00000000'+(Math.random()*0x100000000>>>0).toString(16)).slice(-8)+
			'-'+('00000000'+(Math.random()*0x100000000>>>0).toString(16)).slice(-8)+
			'-'+('00000000'+(Math.random()*0x100000000>>>0).toString(16)).slice(-8)+
			'-'+('00000000'+(Math.random()*0x100000000>>>0).toString(16)).slice(-8);
}

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
	
	/* TODO:
		Access the database to check if the user's login is valid.
		Send back to signin page with an error message if not valid.
	*/
	
	setSession(req, res, 1/*user_id*/);
	
	res.redirect('home.html');
}

function getsignup(req, res) {
	let username = req.body.username;
	let password = req.body.password;  
	
	/* TODO:
		Validate credentials are valid.
		Send back to signup page with an error message if not valid.
	*/

	const params = {error: 'Oops! You just made an account. This isn\'t actually an error.', username: username};
	res.render('signin', params);
}

function setSession(req, res, userID){
	let sessionID=GUID();
	sessions.set(sessionID, userID);
	res.cookie('session',sessionID);
}

function getAuthenticatedUserID(req, res){
	validateSession(req, res);
	return sessions.get(req.cookies.session);
}

function validateSession(req, res){
	let session = req.cookies.session;// Get cookie
	
	if (!sessions.has(session)){
		res.redirect('noauth.html');
		res.end();
		throw new Error("Not logged in.");
	}
}