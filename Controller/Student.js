
const employees = require('../Models/User.js');
const jwt = require('jsonwebtoken');

//create user
const createStudent=async(req,res)=>{
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
         number:req.body.number,
         age:req.body.age,
         address:req.body.address,
        });
        await newemployee.save().then((data)=>{
           res.status(200).json({login:false,message:"Register Successful",data})
           
        }).catch((err)=>{
           res.status(500).json({message:"There was a server side error....!",err});
        
        })
     
   }
   
}


//signIn
const signIn= async(req,res)=>{
   const {email,password}=req.body;
 
try {
   const user= await students.findOne({email});
   if(user.email===email && user.password===password){
      const data={
           login:true,
           name:user.name,
           email:user.email,
           department:user.department,
      }
      const token = jwt.sign(data,process.env.JWT_SECRET_KEY);
      res.cookie('token',token);
      res.status(200).json({login:true,message:"Login Successful",user,token})
   }
} catch (error) {
   res.status(500).json({message:"Please Enter valid Email or Password..!",error})
}
}

const logout= async(req,res)=>{
 
//   req.logout();
   res.status(200).json({
    status: 'Bye!'
   });
}



module.exports={createStudent,signIn,logout}