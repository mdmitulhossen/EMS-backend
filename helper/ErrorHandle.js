const errorHandle = (err,req,res,next)=>{
   console.log( `error ${err.message}`) // log the error
   const status = err.status || 400
   // send back an easily understandable error message to the caller
   response.status(status).send(err.message)
}

module.exports={errorHandle};