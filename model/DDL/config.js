"use strict" 

let sqlconfig ={};
Object.defineProperties(sqlconfig,
		{
			host : {value:"localhost", writable:true, enumerable:true, configurable:true},
			user: {value:"admin", writable:true, enumerable:true, configurable:true},
            password: {value:"123456", writable:true, enumerable:true, configurable:true},
            database: {value:'BANK', writable:true, enumerable:true, configurable:true},
			multipleStatements:  {value:true, writable:true, enumerable:true, configurable:true},

		} 
		);
Object.freeze(sqlconfig)




module.exports = sqlconfig;