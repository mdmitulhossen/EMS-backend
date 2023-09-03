const mongoose = require('mongoose');


const userSchema= new mongoose.Schema({

    email:{
        type:String,
        require:true,
        unique:true
    },
    attendings:[
        {
            date:{
                type:String,
                default:Date.now()
            },
            approved: Boolean,
        },
    ],
  
}
,
{
    timestamps:true
}
)

module.exports=mongoose.model("attendace",userSchema)