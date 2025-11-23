import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"], 
    unique: true,
    lowercase: true,
    trim: true
    },
   password:{
    type: String,
    required: [true,"password is required"],
    minlentgh: [6,"password must be at least 6 characters long"]
    },
    cartItems:[
        {
            quanitity:{
                type:Number,
                required:true,
                default:1
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            }
        }
    ],
    role:{
        type:String,
        enum:["costumer","admin"],
        default:"costumer"
    }


  },{timestamps:true}
  );

export const User = mongoose.model("User", userschema);