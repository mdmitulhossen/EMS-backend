const companys = require('../Models/company.js');
const jwt = require('jsonwebtoken');

//create user
const CreateCompany=async(req,res)=>{
   const user=await companys.findOne({email:req.body.email});
   if(user){
      res.status(400).json({message:"User Exists..Please Try another one..!!",user});
   }
   else{
      const newCompany = new companys({
         name:req.body.name,
         email:req.body.email,
         password:req.body.password,
        });
        await newCompany.save().then((data)=>{
           res.status(200).json({login:false,message:"Register Successful",data})
           
        }).catch((err)=>{
           res.status(500).json({message:"There was a server side error....!",err});
        
        }) 
   }
   
}

  //get
  
  const getCompany = async(req,res)=>{
      
    try{
      const companyOne=await companys.findById(req.params.id);
      res.status(200).json(companyOne);
    }catch(err){
        res.status(500).json({message:"There was a server side error....!",err});
    }
  }

    //getAll
  
    const getAllCompany = async(req,res)=>{
        try{
          const companyAll = await companys.find();
    
          res.status(200).json(companyAll);
        }catch(err){
            res.status(500).json({message:"There was a server side error get all employee....!",err});
        }
      }


      //signIn
const signInCompany= async(req,res)=>{
   const {email,password}=req.body;
 
try {
   const user= await companys.findOne({email});
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

const logoutCompany= async(req,res)=>{
 
//   req.logout();
   res.status(200).json({
    status: 'Bye!'
   });
}


module.exports={CreateCompany,getCompany,getAllCompany,signInCompany,logoutCompany}