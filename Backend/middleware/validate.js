const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const token=req.headers.token
    if(!token){
        return res.json({msg: 'Access denied'}).status(400)
    }
    jwt.verify(token,'authen',(err,decode)=>{
        if(err){
            res.json("Invalid token")
        }
        else{
            console.log("Verified token ")
            return next()
        }
    })
} 
module.exports = verifyToken