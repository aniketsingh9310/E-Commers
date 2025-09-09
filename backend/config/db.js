import mongoose from "mongoose";

const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("✅ Mongodb connected")
    }catch(e){
        console.log("DB error")
    }
}


export default connectDb;