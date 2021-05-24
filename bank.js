// Import express

"use strict" 

const express = require('express');
	// Create an instance of the app
const  app = express();
const  csp = require('helmet-csp');
app.use(express.static(__dirname + '/public'));

	
class RPS 
{
  constructor(port)
  {
	  this.port = port; 
  }
  setPort(){
	let portNum = parseInt(this.port);
	let defaultport = 3000; 
	if (typeof(portNum) === 'number'){

		app.listen(portNum);
	}
	else {
		console.log("redirect to port 3000 for default");
		app.listen(defaultport);
	}
  };
 
  routes_Config(){

	const bodyParser = require("body-parser"); 
	app.use(bodyParser.urlencoded({ extended: true })); 
      
	// authentication system 
	const HomePage = require('./routes/home');
	const LoginPage = require('./routes/login');
	const LogoutPage = require('./routes/logout');

	const RegisterPage = require('./routes/register');
	const MainPage = require('./routes/main');
	const session = require('client-sessions');
	// session config httponly 
	app.use(session({
	  cookieName: 'session',
	  
	  secret: 'first secret',
	  duration: 3 * 60 * 1000,
	  activeDuration: 3 * 60 * 1000,
	  cookie: {
		httpOnly: true, // when true, cookie is not accessible from javascript
	  }
	}));

   // csp 
   app.use(csp({
	// Specify directives as normal.
	directives: {
	  defaultSrc: ["'self'"],
	  scriptSrc: ["'self'"],
	  imgSrc: ["'self'"],
	  
	}}))
 



    app.use("/", HomePage);
    app.use("/login", LoginPage);
    app.use("/register", RegisterPage);
	app.use("/main", MainPage);
	app.use("/logout", LogoutPage);


	// customer url
	const CustomerPage = require('./routes/customer');
	app.use("/Customer/", CustomerPage);


	// account url 
	const AccountPage = require('./routes/Account');
	app.use("/Account/", AccountPage);
	const DepositPage = require('./routes/deposit');
	app.use("/Deposit/", DepositPage);
	const TransferPage = require('./routes/transfer');
	app.use("/Transfer/", TransferPage);
	const WithdrawPage = require('./routes/Withdraw');
	app.use("/Withdraw/", WithdrawPage);
  }

}
Object.seal(RPS);
let myGame = new RPS(3000)
myGame.setPort()
myGame.routes_Config()