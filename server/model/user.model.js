import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    mobile:{
        type: String,
        unique: true,
        required: true
    }
},{
    timestamps:true
})

const UserModel= mongoose.model('user',userSchema)

export default UserModel