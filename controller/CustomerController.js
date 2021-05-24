"use strict" 
const DBqueries = require("./DBqueries");

const  customer = require("../model/customer");
module.exports ={

   
    
    
    getCustomerbyId:(userid, callback)=>{
        const statement = "Select * from CUSTOMERS where CUSTOMERS.refuserid=?;";
        DBqueries.query(statement,[userid],function(data){
            let customers = []; 
            for(let i = 0 ; i < data.length ; i++){
               let current_customer = Object.create(customer);

               current_customer.CustomerId = data[i]['CustomerId'];
               current_customer.fname =  data[i]['FNAME'];
               current_customer.lname =  data[i]['LNAME'];
               current_customer.address =  data[i]['C_Address'];
               current_customer.refuserid =  data[i]['refuserid'];

               customers.push(current_customer); 
            }
            return callback(customers[0])
       
        });
       
    },

    setCustomer:(fname,lname,addr,userid)=>{
        const statement = "INSERT INTO CUSTOMERS(FNAME,LNAME,C_Address,refuserid) VALUES(?,?,?,?);";
        
        DBqueries.query(statement,[fname,lname,addr,userid],function(error){
            console.log(error);
        });
         
    }



}