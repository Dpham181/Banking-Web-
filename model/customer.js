"use strict" 

let customer ={};
	Object.defineProperties(customer,
		{
			CustomerId : {value:null, writable:true, enumerable:true, configurable:true},
			fname: {value:0, writable:true, enumerable:true, configurable:true},
			lname: {value:0, writable:true, enumerable:true, configurable:true},
			address:  {value:0, writable:true, enumerable:true, configurable:true},
			refuserid:  {value:0, writable:true, enumerable:true, configurable:true},

		} 
		);
 Object.seal(customer);




module.exports = customer;