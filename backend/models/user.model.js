import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
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

//hash password before saving to database
  
 userSchema.pre("save", async function() {
	if (!this.isModified("password")) return;

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	} catch (error) {
		throw error;
	}
});

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

 const User = mongoose.model("User", userSchema);
 export default User;