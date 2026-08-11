import { FileSpreadsheetIcon } from "lucide-react"
import mongoose from "mongoose"

const userSchema=new mongoose.Schema({         //schema 
    firebaseUid:{
        type:String,
        unique:true
    },
    name:String,
    email:String,  //we are using google authentication so we are not using password 
    avatar:String

},{
    timestamps:true
})

const User=mongoose.model("User",userSchema)     //model 
export default User