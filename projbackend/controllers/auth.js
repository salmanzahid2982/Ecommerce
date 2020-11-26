const User=require("../models/user")
const { check, validationResult } = require('express-validator');

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

exports.signup=(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

    const user=new User(req.body);
    user.save((err,user)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Not able to save data into DB"
            });
        }
        res.json({
            name:user.name,
            email:user.email,
            id:user._id 
        })
    })
};

exports.signin=(req,res)=>{
    const {email,password}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error:errors.array()[0].msg
        });
    }
    User.findOne({email},(err,user)=>{
        if(err||!user){
            return res.status(400).json({error:"User doesnot exist"});
        }
        if(!user.autheticate(password))
        {   
            return res.status(401).json({
                error:"Email and password do not match"
            });
        }
        //create token
        const token=jwt.sign({_id:user._id},process.env.SECRET);
        res.cookie("token",token,{expire:new Date()+ 9999});

        //send response to our frontend
        const {_id,name,email,role}=user;
        return res.json({token,user:{_id,name,email,role}});
    })
}

exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({message:"user signout successfully"})
}

//Protected Routes
exports.isSignedIn=expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
});

//Cutom Middleware
exports.isAutenticated=(req,res,next)=>{
    let cheker=req.profile && req.auth && req.auth._id == req.auth._id;
    if(!cheker)
    {
        return res.status(403).json({
            error:"Access Denied"
        })
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0)
    {
        return res.status(403).json({
            error:"you are not the admin, ACEESS DENIED"
        })
    }
    next();
}