"use strict" 

// this is the route of home page 

const express = require('express');
const router = express.Router();
const Auth_Controller = require('../controller/authentication')



router.get("/",  Auth_Controller.getHomePage);



module.exports = router; 