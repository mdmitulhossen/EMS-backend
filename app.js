//external import
const express = require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');


//internal Import
const employee = require('./Routes/Auth.js');
const company = require('./Routes/company.js');
const attendance = require('./Routes/attendace.js');


//Initialize
const app=express();
require('dotenv').config();


//connect mongoDB
const connect = async()=>{
   try {
    await mongoose.connect(process.env.MONGODB,{useNewUrlParser:true},()=>{
        console.log("MONGODB CONNECTED")
    })
   } catch (error) {
      console.log("MongoDB isn't connected....!!")
   }
}
mongoose.set({strictQuery:true});



//builtIn middlewire
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

//application middlewire
app.use("/api/employee",employee);
app.use("/api/company",company);
app.use("/api/attendance",attendance);


//listen
app.listen(process.env.PORT,(req,res)=>{
    
    console.log(`App listening on http://localhost:${process.env.PORT}/`);
    connect();
})