"use strict" 

const  sqlconfig = require("../model/DDL/config");

const mysql = require('mysql2');

const mysqlConn = mysql.createConnection({
	host: sqlconfig.host,
	user: sqlconfig.user,
	password: sqlconfig.password,
	multipleStatements: sqlconfig.multipleStatements,
    database:sqlconfig.database
	
});
module.exports ={

   
    // select statement with or without condition
    query:(statment,params, callback)=>{
        const result = [];
        // Execute a prepared statement
        mysqlConn.query(statment,
            params,
        
            // The call back when the query completes
            function(err, rows, fields){
                if(err) throw err;
              
               
                return  callback(rows); 

            }
            
            
            
            );   
    
    },
   


    
}