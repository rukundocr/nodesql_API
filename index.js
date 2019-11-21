const mysql = require('mysql');
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000;
app.use(bodyparser.json());
 var mysqlconnection = mysql.createConnection({
 host:"localhost",
user:"root",
 password:"",
 database:"employeedb"

 });
 
 mysqlconnection.connect((err)=>{
     if(!err)
     console.log("db connection succeed");
     else
     console.log("Db connection fails \n error :" + JSON.stringify(err,undefined,2));
 });
 app.listen(port,()=>console.log(`server listening on port ${port}`));


 //get all employee in the table 
 app.get('/employee',(req,res)=>{
  mysqlconnection.query('SELECT * FROM employees',(err,rows,fields)=>{
       if(!err)
       res.send(rows);
       else 
       console.log(err);
  })
 });

 // get specific employee based on id 
 app.get('/employee/:id',(req,res,next)=>{
    mysqlconnection.query('SELECT * FROM employees WHERE empId = ?',[req.params.id],(err,rows,fields)=>{
         if(!err)
         res.send(rows[0]);
         else 
         console.log(err);
    })
   });

   app.delete('/employee/:id',(req,res,next)=>{
    mysqlconnection.query('DELETE FROM employees WHERE empId = ?',[req.params.id],(err,rows,fields)=>{
         if(!err)
         res.send('DELETED SUCCESSFULLY');
         else 
         console.log(err);
    })
   });
   
   app.post('/employee',(req,res,next)=>{
       var  firstname = req.body.firstname;
       var lastname= req.body.lastname;
       var salary = req.body.salary;
       var sql = `INSERT INTO employees (firstname,lastname,salary) VALUES ("${firstname}", "${lastname}","${salary}")`;
    mysqlconnection.query(sql,(err,rows,fields)=>{
         if(!err)
         res.status(201).send('post  succcessfully saved ');
         else 
         console.log(err);
    })
   });

   app.put('/employee/:id',(req,res,next)=>{
     var  id =req.params.id;
     var  firstname = req.body.firstname;
     var lastname= req.body.lastname;
     var salary = req.body.salary;
     var sql = `UPDATE employees SET firstname = "${firstname}", lastname ="${lastname}", salary ="${salary}"  WHERE empId =${id}`;
  mysqlconnection.query(sql,(err,rows,fields)=>{
       if(!err)
       res.status(201).send('updated successfully ');
       else 
       console.log(err);
  })
 });


