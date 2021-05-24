"use strict"


const bcrypt = require('bcryptjs');
const UserController = require("./UserController");
const xssFilters = require('xss-filters');
const path = require('path');


// authentication system 
module.exports = {


  // home page
  getHomePage: (req, res) => {


    res.sendFile(path.join(__dirname + '/views/home.html'));

  },


  // login  page



  AuthenticatePage: (req, res) => {
    if (!req.body.uname || !req.body.psw) {
      res.send('Http error code 400: missing parameters')
    }
    let authUrl = "/";
    const username = xssFilters.inHTMLData(req.body.uname);
    const password = xssFilters.inHTMLData(req.body.psw);
    UserController.getUser(username, function (User) {


      if (!User) {
        return res.redirect(req.get('referer'));

      }

      const hashpass = User.password;
      bcrypt.compare(password, hashpass, function (err, ress) {
        if (ress) {
          authUrl = "/main";
          req.session.user = User.username;
          res.setHeader("Content-Type", "text/html")

          return res.redirect(authUrl)

        }

        return res.redirect(authUrl)

      });


    });






  },
  // logout
  Logout: (req, res) => {
    if (req.session && req.session.user) {
      req.session.reset();
      return res.redirect('/')
    }

  },


  // register page
  RegisterPage: (req, res) => {
    const saltRounds = 10;

    if (!req.body.uname || !req.body.psw) {
      return res.redirect('/')
    }

    UserController.getUser(req.body.uname, function (user) {
      if (!user) {
        const username = xssFilters.inHTMLData(req.body.uname);
        const password = xssFilters.inHTMLData(req.body.psw);
        bcrypt.hash(password, saltRounds, function (err, hash) {
          UserController.setUser(username, hash)

        });
        return res.redirect(req.get('referer'));

      }
      else {
        return res.redirect('/')

      }
    });
  },
}