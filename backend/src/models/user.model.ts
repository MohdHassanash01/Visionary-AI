
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        trim: true
    },
    email:{
        type: String,
        required:true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required:true,
        trim: true
    },
    creditBalance: {
        type: Number,
        default: 5
    }

},{timestamps: true})

 const userModel = mongoose.model("user",userSchema)

 export default userModel