import mongoose from "mongoose";
import generateId from "../helpers/generateId.js";

const veterinarySchema = mongoose.Schema({
  name:{type:String, required:true, trim:true},
  password:{type:String, required:true},
  email:{type:String, required:true, unique:true},
  telephone:{type:String, default:null, trim:true},
  web:{type:String, default:true},
  token:{type:String, default:generateId()},
  confirmed:{type:Boolean, default:false}
})

const Veterinary = mongoose.model("Veterinary", veterinarySchema)
export default Veterinary