# WEB - SERCURITY CPSC 455
## Name: Danh Pham
## Email: dpham181@csu.fullerton.edu
## Requriement: 
    1. Implemeted MVC model ( route, controller, model) 
    2. front-end Flex-box
    3. Database controller  RDBMS ( DBquuires.js builded as select, insert, update with relational arch such as choosing a table with condition)
    4. microservies as three res: user, customer, and account
    5. Model as an seal object ( each of microservies build using an seal model object)
    6. Xss attack prevention by using xxfilter for scaning the user input with a method replacing all < > and more 
    7. Content Security Policy implemneted to use all the resourses from this application only such as img, object, and etc
    8. xssfillter also used in input value. 
    9. session controler with session management with httponly
    10. broken authentication prevention by using hashing password 
    11. session management also blocked the user if they tried to acess the /main uri
## Execution:
 1. locate to project Name
 2. npm start or node bank.js
## Basic penetration testing:
 1. <script> alert("1") </script> (stored into the database with "username":"&lt;script> alert(\"1\") &lt;/script>" )
 2. all the input for transfer money or deposit already declear with type numer for prevening script 
 3. cookie can not steal because of using httponly
 4. xmlparsing by using xml2js libs that already set { sax:true}  for preventing entity attack 
    