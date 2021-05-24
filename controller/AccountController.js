"use strict" 
const DBqueries = require("./DBqueries");

const  acc = require("../model/account");


// not nessary at this application
// when adding marial db then can use this as independen injection 
module.exports ={

    
    // get user account balances 
    getUserAccount:(userid, callback)=>{
        

      const statement = "Select * from ACCCOUNTS where ACCCOUNTS.refcustomerID=?;";
      DBqueries.query(statement,[userid],function(data){
          let user_accounts = []; 
          for(let i = 0 ; i < data.length ; i++){
             let user_account = Object.create(acc);

             user_account.AccId = data[i]['AccId'];
             user_account.balances =  data[i]['balances'];
             user_account.refCusId =  data[i]['refcustomerID'];
             user_account.type =  data[i]['accountType'];
             user_accounts.push(user_account); 
          }
          return callback(user_accounts)
     
      });
     

    },
    
    // create new account 
    CreateUserAccount:(CustomerId, amount, type)=>{
      let sstype = "SAVING";
      if(type === 1){
        sstype="CHECKING";
      }
        
      const statement = "INSERT INTO ACCCOUNTS(balances, accountType,refcustomerID) VALUES(?,?,?);";
      DBqueries.query(statement,[amount, sstype, CustomerId],function(error){
        console.log(error);
      });
 
     },

     // Update current account 

     UpdateAccount:(amount,fromacc,toAccid, callback)=>{
       // transfer 
       const  statementSubtraction = "UPDATE ACCCOUNTS SET ACCCOUNTS.balances = (ACCCOUNTS.balances - ?) WHERE ACCCOUNTS.AccId =? ; "
       const  statementAddition = "UPDATE ACCCOUNTS SET ACCCOUNTS.balances = (ACCCOUNTS.balances + ?) WHERE ACCCOUNTS.AccId =? ; "
       const stmt = "SELECT ACCCOUNTS.balances FROM ACCCOUNTS WHERE ACCCOUNTS.AccId =? ; "
       
       
       if(fromacc){
       DBqueries.query(stmt,[fromacc],function(data){
        let check = false;

          if(amount > data[0]['balances']){
            console.log(amount)
            console.log(data)

            check = true;
            return callback(check);
          }
          else{
            if (amount && fromacc && toAccid){
        
              DBqueries.query(statementSubtraction,[amount,fromacc],function(error){
                console.log(error);
                DBqueries.query(statementAddition,[amount,toAccid],function(error){
                  console.log(error);
                   
                });
              });
              // deposit 
            
            }else{
              DBqueries.query(statementSubtraction,[amount,fromacc],function(error){
                console.log(error);
                 
              });
            }
            return callback(check)
          }
       });
      }

       if(amount && toAccid){
      
        DBqueries.query(statementAddition,[amount,toAccid],function(error){
          console.log(error);
           
        });
      }
      //WITHDRAW



     }


}