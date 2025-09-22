import User from "../model/userModel.js";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { gentoken, gentoken1 } from "../config/token.js";

export const registration = async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"*User already exists"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"*Enter a valid email"})
        }
        if(password.length < 8){
            return res.status(400).json({message:"*enter minimun 8 digits"})
        }

        let hashPassword = await bcrypt.hash(password,10)

        const user = await User.create({name,email,password:hashPassword})
        let token = await gentoken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge: 7 * 24 * 60 * 1000
        })
        return res.status(201).json(user)

    }catch(e){
        console.log("register error")
        return res.status(505).json({message:'register error'})
    }
}

export const login = async (req,res)=>{
    try{
        let {email,password} = req.body;
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User is not found"})
        }
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"})
        }
        let token = await gentoken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge: 7 * 24 * 60 * 1000  

        })
        return res.status(201).json(user)

    }catch(e){
       console.log("login error")
       return res.status(500).json({message:`login error ${e}`})
    }
}

export const logOut = async (req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"logOut successful"})
    }catch(e){
        console.log('logout error')
        return res.status(500).json({message:`logOut error ${e}`})
    }
}

export const googleLogin = async (req,res)=>{
     try{
        let {name , email} = req.body;
        let user = await User.findOne({email})
        if(!user){
            user =await User.create({
                name,email
            })
        }

        let token = await gentoken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge: 7 * 24 * 69 * 1000
        })

        return res.status(200).json(user)

     }catch(e){
        console.log("googleLogin error")
        return res.status(500).json({message:`googleLogin error ${e}`})
     }
}

export const adminLogin = async (req,res) =>{
     try{
        let {email ,password} = req.body 
        if(email === process.env.ADMIN_EMAIL &&
             password === process.env.ADMIN_PASSWORD){

                let token = await gentoken1(email)
                    res.cookie("token",token,{
                        httpOnly:true,
                        secure:true,
                        sameSite:"none",
                        maxAge: 1 * 24 * 69 * 1000
                    })

             return res.status(200).json(token)
             }
             return res.status(400).json({message:"invalid creadintials"})
     }catch(e){
        console.log("adminlogin error")
        return res.status(500).json({message:`adminlogin error ${e}`})
    }
}
