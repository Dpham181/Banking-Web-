"use strict"
const UserController = require("./UserController");
const AccountController = require("./AccountController");
const CustomerController = require("./CustomerController");
const customerModel = require("../model/customer");
const xssFilters = require('xss-filters');

function generateMainPage(res, username, bankinfo) {


  let pageStr = "	<!DOCTYPE html>";
  pageStr += "	<html>";

  pageStr += "	<head>";
  pageStr += "		<title> My Bank </title>";
  pageStr += "	 <link rel='stylesheet' href='/stylesheets/user.css'>";
  pageStr += "	</head>";

  pageStr += "	<body>";

  // header nav
  pageStr += "	<div>";
  pageStr += "	<ul>";
  pageStr += "<li><a href='/'>Home</a></li>";
  pageStr += "    <li class = 'right'><a href='/logout'>Log Out</a></li>";
  pageStr += "<li class = 'right'><a href=''>Hi, ";
  pageStr += xssFilters.inHTMLData(username);
  pageStr += " </a>";
  pageStr += " </li>";
  pageStr += "	</ul>";
  pageStr += "	</div>";

  // main
  pageStr += "	<div class='main'>";
  if (bankinfo) {
    pageStr += "<div class='boxcols'> ";

    pageStr += "<div class='outerbox'> ";

    for (let i = 0; i < bankinfo.length; i++) {

      pageStr += "<div class='box'> ";
      pageStr += "<div> <h1>" + xssFilters.inHTMLData(bankinfo[i].AccId) + "</h1></div>";

      pageStr += "<div> <h1>" + xssFilters.inHTMLData(bankinfo[i].type) + "</h1></div>";
      pageStr += "<div> <h1>Balances: " + xssFilters.inHTMLData(parseFloat(bankinfo[i].balances).toFixed(2)) + "</h1></div>";


      pageStr += "</div> ";
    }



    pageStr += "</div> ";

    // form 
    pageStr += "<div>";
    pageStr += " <form action='/submit' method='POST' id='transfer'>";
    pageStr += "<div> <h1>Transfer</h1></div>";
    pageStr += "<div><input type='number' step='0.01' min='0' placeholder='Enter Amount' name='money' required></div>";
    pageStr += "<div><select name='FromAccId'  form='transfer'>";
    for (let i = 0; i < bankinfo.length; i++) {
      pageStr += "<option value='" + xssFilters.inSingleQuotedAttr(bankinfo[i].AccId) + "'>From Account " + bankinfo[i].AccId + "</option>";
    }
    pageStr += "</select>";
    pageStr += "</div>";
    pageStr += "<div><select name='ToAccId'  form='transfer'>";
    for (let i = 0; i < bankinfo.length; i++) {
      pageStr += "<option  value='" + xssFilters.inSingleQuotedAttr(bankinfo[i].AccId) + "'>To Account " + xssFilters.inHTMLData(bankinfo[i].AccId) + "</option>";
    }
    pageStr += "</select>";
    pageStr += "</div>";
    pageStr += "<div><button type='submit' formaction='/Transfer/'>Transfer</button></div>";
    pageStr += "	</form>";
    // deposit
    pageStr += " <form action='/submit' method='POST' id ='deposit/Withdraw'>";
    pageStr += "<div> <h1>Deposit/Withdraw</h1></div>";
    pageStr += "<div><input type='number' step='0.01' min='0' placeholder='Amount Deposit' name='money' required></div>";
    pageStr += "<div><select name='AccId'  form='deposit/Withdraw'>";
    for(let i = 0 ; i < bankinfo.length; i++){
    pageStr += "<option  value='"+xssFilters.inSingleQuotedAttr(bankinfo[i].AccId)+"'>Account "+xssFilters.inHTMLData(bankinfo[i].AccId)+"</option>";
    }
    pageStr += "</select>";
    pageStr += "</div>";
    pageStr += "<div><button type='submit' formaction='/Deposit/'>Deposit</button></div>";
    pageStr += "<div><button type='submit' formaction='/Withdraw/'>Withdraw</button></div>";
    pageStr += "	</form>";

    // create account
    pageStr += " <form action='/submit' method='POST' id ='thisform'>";
    pageStr += "<div> <h1>Open New Account</h1></div>";
    pageStr += "<div><input type='number'  step='0.01' min='0' placeholder='Amount Deposit' name='money' required></div>";
    pageStr += "<div><select name='type'  form='thisform'>";
    pageStr += "<option value='1'>Checking</option>";
    pageStr += "<option value='2'>Saving</option>";
    pageStr += "</select>";
    pageStr += "</div>";
    pageStr += "<div><button type='submit' formaction='/Account/'>Create</button></div>";
    pageStr += "	</form>";

    pageStr += "	</div>";


    pageStr += " </div> ";


    pageStr += "</div> ";


  }

  else {

    pageStr += " <form action='/submit' method='POST'>";
    pageStr += "<div> <h1>Become A customer</h1></div>";
    pageStr += "<div><input type='text' placeholder='Enter First Name' name='fname' required></div>";
    pageStr += "<div><input type='text' placeholder='Enter Last Name' name='lname' required></div>";
    pageStr += "<div><input type='text' placeholder='Enter address' name='addr' required></div>";
    pageStr += "<div><button type='submit' formaction='/Customer/'>Register</button></div>";
    pageStr += "	</form>";


  }

  pageStr += "	</div>";

  // footer 


  pageStr += "	</body>";
  pageStr += "</html>	";

  // Send the page
  res.send(pageStr);

}

module.exports = {






  // user page
  getMainPage: (req, res) => {

    if (req.session && req.session.user) {
      UserController.getUser(req.session.user, function (user) {

        if (!user) {
          req.session.reset();

          return res.redirect('/')

        }


        CustomerController.getCustomerbyId(user.userId, function (customer) {
          if (!customer){
            return generateMainPage(res, user.username, null)

          }
          AccountController.getUserAccount(customer.CustomerId, function (user_accounts) {
            if(user_accounts){
            return generateMainPage(res, customer.fname, user_accounts)
            }

          });
        });


      });




    } else {
      return res.redirect('/')
    }
  },

  // registration 

  CusomterPage: (req, res) => {

    if (!req.body.fname || !req.body.lname || !req.body.addr) {
      return res.redirect('/main')
    }
     UserController.getUser(req.session.user, function(user){
      if(user){
        const fname = xssFilters.inHTMLData(req.body.fname);
        const lname = xssFilters.inHTMLData(req.body.lname);
        const address = xssFilters.inHTMLData(req.body.addr);
        CustomerController.setCustomer(fname,lname,address,user.userId);
        return res.redirect('/main');

      }
  });
  },
 // new account
  OpenAccount: (req, res) => {

    if (!req.body.money || !req.body.type) {
      return res.redirect('/main')
    }
   
    UserController.getUser(req.session.user, function (user) {
    CustomerController.getCustomerbyId(user.userId, function (customer) {
    let amount = parseFloat(xssFilters.inHTMLData(req.body.money));
    let type = parseInt(xssFilters.inHTMLData(req.body.type))
    AccountController.CreateUserAccount(customer.CustomerId, amount, type);
    return res.redirect('/main');
      
      });
    });
   
  },

// transfer fund
  TransferMoney: (req, res) => {
    if (!req.body.money || !req.body.FromAccId || !req.body.ToAccId) {
      return res.redirect('/main')
    }
    let amount = parseFloat(xssFilters.inHTMLData(req.body.money));
    const fromacc = parseInt(xssFilters.inHTMLData(req.body.FromAccId));
    const toacc = parseInt(xssFilters.inHTMLData(req.body.ToAccId));
    AccountController.UpdateAccount(amount, fromacc, toacc , function (check) {
      if (check === true){
        return res.send('BALANCES NOT ENOUGH TO TRANSFER')
      }
      else{
        return res.redirect(req.get('referer'));

      }
    });

  },
// deposit fund
  Deposit: (req, res) => {
    if (!req.body.money || !req.body.AccId) {
      return res.redirect('/main')
    }
    const amount = parseFloat(xssFilters.inHTMLData(req.body.money));
    const toacc = parseInt(xssFilters.inHTMLData(req.body.AccId));
   

    AccountController.UpdateAccount(amount, null, toacc, function (check) {
     
    });
    return res.redirect(req.get('referer'));

  },
  // withdraw fund 
  Withdraw:(req,res)=>{
    if (!req.body.money ||  !req.body.AccId) {
      return res.redirect('/main')
    }
    const amount = parseFloat(xssFilters.inHTMLData(req.body.money)); 
    const FromAccId = parseInt(xssFilters.inHTMLData(req.body.AccId)); 
    AccountController.UpdateAccount(amount,FromAccId,null,function (check) {
      if (check === true){
        return res.send('BALANCES NOT ENOUGH TO WITHDRAW')
      }
      else{
        return res.redirect(req.get('referer'));

      }
    }); 
 
   }
}