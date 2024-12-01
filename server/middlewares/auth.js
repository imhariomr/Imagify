const jwt = require("jsonwebtoken");

const userAuth = async(req,res,next)=>{
    const {token} = req.headers;

    if(!token){
        return res.json({success:false, message : 'Not Authorised'})
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        if(decode.id){
            req.body.userId = decode.id;
        }else{
            return res.json({success:false,message : "Failed to Login Try Again"});
        }
        next();
    }catch(error){
        return res.json({success:false, message:"error.message"});
    }
}

module.exports = {userAuth};