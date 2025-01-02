import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

veterinarySchema.pre('save', async function(next){
  /*no volver a hashear el password*/
  if(!this.isModified('password')){
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

veterinarySchema.methods.checkPassword = async function(formPassword){
  return await bcrypt.compare(formPassword, this.password)
}

const Veterinary = mongoose.model("Veterinary", veterinarySchema)
export default Veterinary