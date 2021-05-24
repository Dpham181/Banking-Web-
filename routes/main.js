"use strict" 

// this is the route of home page 

const express = require('express');
const router = express.Router();
const Main_Controller = require('../controller/MainController')



router.get("/",  Main_Controller.getMainPage);



module.exports = router; 