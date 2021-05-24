DROP DATABASE IF EXISTS BANK;
CREATE DATABASE IF NOT EXISTS BANK;

DROP USER IF EXISTS 'admin'@'localhost';
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY '123456';


DROP USER IF EXISTS 'user'@'localhost';
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY '123456';


USE BANK;
GRANT ALL PRIVILEGES ON BANK.*  TO 'admin'@'localhost';


CREATE TABLE USERS(
    userId INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username varchar(256) NOT NULL,
    psw varchar(256)  NOT NULL
); 
GRANT ALL PRIVILEGES ON USERS.*  TO 'admin'@'localhost';
GRANT SELECT,UPDATE,INSERT ON USERS.*  TO 'user'@'localhost';

CREATE TABLE CUSTOMERS(
    CustomerId INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    FNAME varchar(100) ,
    LNAME varchar(100) , 
    C_Address varchar(100),
    refuserid INT(10) NOT NULL, 
    CONSTRAINT FOREIGN KEY (refuserid) REFERENCES USERS(userId)

);
GRANT ALL PRIVILEGES ON CUSTOMERS.*  TO 'admin'@'localhost';
GRANT SELECT,UPDATE,INSERT ON USERS.*  TO 'user'@'localhost';

CREATE TABLE ACCCOUNTS(
    AccId INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    balances FLOAT DEFAULT 0.00,
    accountType varchar(100),
    refcustomerID INT(10) NOT NULL,
    CONSTRAINT FOREIGN KEY (refcustomerID) REFERENCES CUSTOMERS(CustomerId)
);
GRANT ALL PRIVILEGES ON ACCCOUNTS.*  TO 'admin'@'localhost';
GRANT SELECT,UPDATE,INSERT ON ACCCOUNTS.*  TO 'user'@'localhost';



INSERT INTO USERS(USERNAME,USERS.PSW) VALUES
('tester1', '$2a$10$YwKu4Fy6UdCAW.5vJxU/ouGEfHh7vaINy9qoBaqj7LaHi5E0GggFq'),
('tester2', '$2a$10$YwKu4Fy6UdCAW.5vJxU/ouGEfHh7vaINy9qoBaqj7LaHi5E0GggFq'),
('tester3', '$2a$10$YwKu4Fy6UdCAW.5vJxU/ouGEfHh7vaINy9qoBaqj7LaHi5E0GggFq');

INSERT INTO CUSTOMERS(FNAME,LNAME,C_Address,refuserid) VALUES
('danh', 'pham', 'myaddress',1 ),
('danh1', 'pham2', 'myaddress',2 ),
('danh3', 'pham3', 'myaddress',3 );


INSERT INTO ACCCOUNTS(balances, accountType,refcustomerID) VALUES
(100.00, 'CHECKING',1 ),
(200.00, 'SAVING', 1 ),
(100.00, 'CHECKING',2 ),
(200.00, 'SAVING', 2 ),
(100.00, 'CHECKING',3 ),
(200.00, 'SAVING', 3 );
