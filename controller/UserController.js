"use strict" 
const DBqueries = require("./DBqueries");
const  user = require("../model/user");


module.exports ={

    
   
    
    getUser:(username,callback)=>{        

        const statement = "Select USERS.userId, USERS.username, USERS.psw from USERS where USERS.username=?;";
        DBqueries.query(statement,[username],function(data){
            let users = []; 
            for(let i = 0 ; i < data.length ; i++){
               let current_user = Object.create(user);

              current_user.userId = data[i]['userId'];
               current_user.username =  data[i]['username'];
               current_user.password =  data[i]['psw'];
                users.push(current_user); 
            }
            return callback(users[0])
       
        });
       
     
    },

    setUser:(username,password)=>{
        const statement = "INSERT INTO USERS(username,psw) VALUES(?,?);" ;

        return DBqueries.query(statement,[username,password],function(error){
            console.log(error)
        }); 
      
    }



}