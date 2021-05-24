
"use strict" 

let account ={};
Object.defineProperties(account,
		{
			AccId : {value:0, writable:true, enumerable:true, configurable:true},
			balances: {value:0, writable:true, enumerable:true, configurable:true},
			refCusId: {value:0, writable:true, enumerable:true, configurable:true},
			type: {value:0, writable:true, enumerable:true, configurable:true}	

		} 
		);
Object.seal(account);



module.exports = account;