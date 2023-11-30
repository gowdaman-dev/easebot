import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    message:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
},

{timestamps:true});

const Notice = mongoose.models.Notice || mongoose.model("Notice" , noticeSchema);

export default Notice;