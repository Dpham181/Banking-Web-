"use strict" 

// this is the route of login page 

const express = require('express');
const router = express.Router();
const Auth_Controller = require('../controller/authentication')



router.get("/",  Auth_Controller.Logout);



module.exports = router; 