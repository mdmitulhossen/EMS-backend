const jwt = require('jsonwebtoken')

const requiredSignIn=(req,res,next)=>{
    console.log(req.headers)
    next()
}

module.exports={requiredSignIn}