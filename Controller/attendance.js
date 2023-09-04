const moment = require('moment/moment.js');
const attendace = require('../Models/attendace.js');
const jwt = require('jsonwebtoken');

//create user
// const CreateEmployee=async(req,res)=>{
//    const user=await attendace.findOne({email:req.body.email});
//    if(user){
//       res.status(400).json({message:"User Exists..Please Try another one..!!",user});
//    }
//    else{
//       const newemployee = new employees({
//          name:req.body.name,
//          email:req.body.email,
//          password:req.body.password,
//          position:req.body.position,
//          contactNo:req.body.contactNo,
//          age:req.body.age,
//          address:req.body.address,
//          companyId:req.body.companyId,
//         });
//         await newemployee.save().then((data)=>{
//            res.status(200).json({login:false,message:"Register Successful",data})
           
//         }).catch((err)=>{
//            res.status(500).json({message:"There was a server side error....!",err});
        
//         })
     
//    }
   
// }
const createAttendance = async(req,res)=>{
    const user=await attendace.findOne({email:req.body.email});
    if(user){
        // update the attendance
        console.log("data==>", user)
        const prevAtttendence = user.attendings;
        const dates = prevAtttendence.map((item)=>item.date);
        const today = moment().format('DD-MM-YYYY');
        if(dates.includes(today)){
            return res.status(400).json({message:"Attendance already taken for today"});
        }
        console.log("date==>", today)
        const current = {date:today, approved: false};
        const allAtttendence = [...prevAtttendence, current];
        const updateedData = await attendace.updateOne({email:req.body.email},{$set:{attendings: allAtttendence}});
       return res.status(200).json({message:"attendace Successful",updateedData})
    }
    const newAttendance = new attendace({
        email:req.body.email,
       });
       await newAttendance.save().then((data)=>{
         return res.status(200).json({message:"attendace Successful",data})
          
       }).catch((err)=>{
          res.status(500).json({message:"There was a server side error....!",err});
       
       })
    
  }


//   approve attendence
  const approveAttendence = async(req,res)=>{
    const {email, date} = req.body;
    const user = await attendace.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    const aprovalAttendence = user?.attendings?.find((item)=>item?.date === date);
    if(!aprovalAttendence){
        return res.status(400).json({message:"Date not found"});
    }
    aprovalAttendence.approved = true;
    const otherAttendence = user?.attendings?.filter((item)=>item?.date !== date);
    const allAtttendence = [...otherAttendence, aprovalAttendence];
    const updateedData = await attendace.updateOne({email:req.body.email},{$set:{attendings: allAtttendence}});
    return res.status(200).json({message:"attendace Successful",updateedData})
  }

  const getAttendance = async(req,res)=>{
    try{
      const aaaa = await attendace.find();

      res.status(200).json(aaaa);
    }catch(err){
        res.status(500).json({message:"There was a server side error get all employee....!",err});
    }
  }
  module.exports={createAttendance,approveAttendence,getAttendance}