
import UserModel from "../model/user.model.js";
import bcryptjs from 'bcryptjs'



export const userController= async function(req,res){
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