import { Schema, model } from "mongoose";

const userSchema = Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  password: { type: String, required: true },
  verified : {type:Boolean , required:true}
  
}, {timestamps : true});

const userModel = model("users", userSchema);

export default userModel;