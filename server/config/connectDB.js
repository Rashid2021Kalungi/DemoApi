import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

if(!process.env.MONGO_URI){
    console.log("provide URI for mongo in .env")
}
const connectDb = async function(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB conected")
    } catch (error) {
        console.log("failed to connect to database", error)
        process.exit(1)
    }
}
export default connectDb