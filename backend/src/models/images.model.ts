import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({

    image:{
        type:String,
        trim: true,
        required: true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
   

},{timestamps: true})

 const imageModel = mongoose.model("images",imageSchema)

 export default imageModel