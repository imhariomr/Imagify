const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.json({sucess:false, msg:"Missing Details"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const userData = {
            name,
            email, 
            password:hashedPassword
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.json({success:true,token,name:user.name});
    }catch(error){
        console.log(error);
        res.json({success:false,msg:"User Already Exist"})
    }
}

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, msg:"Invalid credentials"});
        }

        const isMatched = await bcrypt.compare(password,user.password);
        
        if(isMatched){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            res.json({success:true,token,name:user.name});
        }else{
            return res.json({success:false, msg:"Invalid credentials"});
        }

    }catch(error){
        console.log(error);
        res.json({success:false,msg:error.message})
    }
}


const userCredits = async(req,res)=>{
    try{
        const {userId} = req.body
        const user = await userModel.findById(userId);
        res.json({success:true, credits:user.creditBalance,name:user.name});
    }catch(error){
        console.log(error);
        res.json({success:false,msg:error.message})
    }
}
module.exports = {registerUser,loginUser,userCredits};
