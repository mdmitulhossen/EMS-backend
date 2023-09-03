const mongoose = require('mongoose');


const userSchema= new mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    position:{
        type:String,  
    },
    contactNo:{
        type:String,
    },
    age:{
        type:Number,
    },
     address:{
        type:String,  
    },
    companyId:{
        type:String,  
    },
}
,
{
    timestamps:true
}
)

module.exports=mongoose.model("employee",userSchema)