import {createError} from '../utils/error.js'
import {connectToDB} from '../utils/connect.js'
import User from '../models/userModel.js'
export async function register(req,res,next){
    const data=req.body;
    console.log(data);
    if(!data?.email || !data?.password){
        return next(createError(400,"Missing Fields"));
    }
    await connectToDB();
    const alreadyRegistered=await User.exists({email:data.email});
    if(alreadyRegistered) return next(createError(400,"User already exists"));
    res.send("register");
};

export async function login(req,res,next){};

export async function logout(req,res,next){};