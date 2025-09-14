import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique :true
    },
    password:{
        type:String,
        require:true,
    },
    cartData:{
        type:Object,
        default:{}
    }
/*the option minimize: false is used when you want to store empty objects {} inside MongoDB without Mongoose automatically removing them.*/
},{minimize:false})


const userModel = mongoose.Model.user || mongoose.model("user",userSchema)

export default userModel;