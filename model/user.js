"use strict" 

let user ={};
	Object.defineProperties(user,
		{
			userId : {value:null, writable:true, enumerable:true, configurable:true},
			username: {value:null, writable:true, enumerable:true, configurable:true},
			password: {value:null, writable:true, enumerable:true, configurable:true},
			
		} 
        );
        
Object.seal(user);



module.exports = user;