"use strict" 

// this is the route of register page 

const express = require('express');
const router = express.Router();
const MainController = require('../controller/MainController')



router.post("/",  MainController.CusomterPage);



module.exports = router; 