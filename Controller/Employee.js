const employees = require('../Models/User.js');
const jwt = require('jsonwebtoken');

//create user
const CreateEmployee=async(req,res)=>{
   const user=await employees.findOne({email:req.body.email});
   if(user){
      res.status(400).json({message:"User Exists..Please Try another one..!!",user});
   }
   else{
      const newemployee = new employees({
         name:req.body.name,
         email:req.body.email,
         password:req.body.password,
         position:req.body.position,
         contactNo:req.body.contactNo,
         age:req.body.age,
         address:req.body.address,
         companyId:req.body.companyId,
        });
        await newemployee.save().then((data)=>{
           res.status(200).json({login:false,message:"Register Successful",data})
           
        }).catch((err)=>{
           res.status(500).json({message:"There was a server side error....!",err});
        
        })
     
   }
   
}

//update
const updateEmployee = async(req,res)=>{
    
    try{
      const updateEmployee = await employees.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
      res.status(200).json(updateEmployee);
    }catch(err){
        res.status(500).json({message:"There was a server side error....!",err});
    }
  }
  
  //delete
  
 const deleteEmployee = async(req,res)=>{
      
    try{
      await employees.findByIdAndDelete(req.params.id);
      res.status(200).json("Student has been deleted....");
    }catch(err){
        res.status(500).json({message:"There was a server side error....!",err});
    }
  }
  
  //get
  
 const getEmployee = async(req,res)=>{
      
    try{
      const employeeOne=await employees.findById(req.params.id);
      res.status(200).json(employeeOne);
    }catch(err){
        res.status(500).json({message:"There was a server side error....!",err});
    }
  }
  
  //getAll
  
  const getAllEmployee = async(req,res)=>{
    try{
      const employeeAll = await employees.find();

      res.status(200).json(employeeAll);
    }catch(err){
        res.status(500).json({message:"There was a server side error get all employee....!",err});
    }
  }


        //signIn
const signInEmployee= async(req,res)=>{
  const {email,password}=req.body;

try {
  const user= await employees.findOne({email});
  if(user.email===email && user.password===password){
     const data={
          login:true,
          name:user.name,
          email:user.email,
     }
 
     res.status(200).json({login:true,message:"Login Successful",user})
  }
} catch (error) {
  res.status(500).json({message:"Please Enter valid Email or Password..!",error})
}
}
module.exports={CreateEmployee,updateEmployee,deleteEmployee,getEmployee,getAllEmployee,signInEmployee}