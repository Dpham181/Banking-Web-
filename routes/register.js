"use strict" 

// this is the route of register page 

const express = require('express');
const router = express.Router();
const Auth_Controller = require('../controller/authentication')



router.post("/",  Auth_Controller.RegisterPage);



module.exports = router; 