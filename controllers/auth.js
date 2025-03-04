import {createError} from '../utils/error.js';
import {connectToDB} from '../utils/connect.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

//registration part
export async function register(req,res,next){
    const data=req.body;
    console.log(data);
    if(!data?.email || !data?.password){
        return next(createError(400,"Missing Fields"));
    }
    await connectToDB();
    const alreadyRegistered=await User.exists({email:data.email});
    if(alreadyRegistered) return next(createError(400,"User already exists"));
    
    const salt=bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(req.body.password,salt);
    const newUser=new User({...req.body,password:hash});
    await newUser.save();
    res.status(201).json("User created successfully");

};

//login part
export async function login(req,res,next){
    const data=req.body;
    console.log(data);
    if(!data?.email || !data?.password){
        return next(createError(400,"Missing Fields"));
    }
    await connectToDB();
    //checking for user
    const user=await User.findOne({email:req.body.email});
    if(!user) return next(createError(400,"invalid credentials"));
    //checking for password
    const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password);
    if(!isPasswordCorrect) return next(createError(400,"invalid password"));
    //if correct pass
    const token=jwt.sign({id:user.id},process.env.JWT);
    console.log(token);
    //login session using cookies
    res.cookie("access_token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==="production", //As node_env!="production" secure=false ,we can use http, if true we can only use https
    }).status(200).json("user logged in");

};

//logout part
export async function logout(req,res,next){
    res.clearCookie("access_token",{
        httpOnly:true,
        secure:process.env.NODE_ENV ==="production",
    }).status(200).json({message:"Logged Out Successfully"});
};