
import generateAccessToken from "../config/generateAccessToken.js";
import generateRefreshToken from "../config/generateRefreshToken.js";
import UserModel from "../model/user.model.js";
import bcryptjs from 'bcryptjs'



export async function userController(req,res){
     try {
        

        const {name,email,password,mobile}=req.body
        if(!name || !email || !password || !mobile){
            return res.status(400).json({
                message: "name, email, mobile number and passwor are required",
                error: true,
                success: false
            })
        }
        
        const emailData=await UserModel.findOne({email})
        if(emailData){
           return res.status(409).json({
                message: "Email already in use",
                error: true,
                success: false
            })
        }

        const salt=await bcryptjs.genSalt(10)
        const hashPassword= await bcryptjs.hash(password,salt)

        const payload={
            name,
            email,
            password: hashPassword,
            mobile
        }
         const newUser= new UserModel(payload)
         const savedData= await newUser.save()
          return res.status(201).json({
            message: "User registered successfully",
            success: true,
            error: false,
            data: savedData,
          });


     } catch (error) {
        return res.status(500).json({
            message: error.message || "Something went wrong",
            error: true,
            success: false
        })
     }
}

export async function loginController(req,res){
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(401).json({
                message: "All fields must be filled",
                error: true,
                success: false
            })
        }
        const user= await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "User not found",
                error: true,
                success: false
            })
        }
        const verifyPassword= await bcryptjs.compare(password,user.password);
        if(!verifyPassword){
            return res.status(401).json({
                message: "Incorrect email or Password",
                error: true,
                success: false
            })
        }
        const accessToken=await generateAccessToken(user._id)
        const refreshToken= await generateRefreshToken(user._id)
        const cookieOptions={
            httpOnly: true,
            sucure: true,
            sameSite: "None"
        }
        // const accessToken=generateAccess
        res.cookie("accessToken",accessToken,cookieOptions)
        res.cookie("refreshToken", refreshToken, cookieOptions);
        return res.status(200).json({
            message: "Login successful",
            error: false,
            success: true,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function logoutController(req,res){
    try {
        const cookieOptions = {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        };

        res.clearCookie("accessToken",cookieOptions)
        res.clearCookie("refreshToken", cookieOptions);

        return res.status(200).json({
            message: "logout successful",
            error: false,
            success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}