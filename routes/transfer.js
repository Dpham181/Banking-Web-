"use strict" 

// this is the route of register page 

const express = require('express');
const router = express.Router();
const Acc_Controller = require('../controller/MainController')



router.post("/",  Acc_Controller.TransferMoney);



module.exports = router; 