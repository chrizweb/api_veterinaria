import jwt from "jsonwebtoken";
import Veterinary from "../models/Veterinary.js"; 

const checkAuth = async (req, res, next) => {
  
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //console.log('Si tiene el token con bearer')
  }

  try {
    token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    
    /*req.veterinary -> creara una secion con la informacion de vetrinario*/
    req.veterinary = await Veterinary.findById(decode.id)
    .select("-password -token -confirmed")
    return next()

  } catch (error) {
    const e = new Error("Token no valido...!")
    res.status(403).json({msg: e.message})
  }

  if(!token){
    const error = new Error("Token no valido o inexistente...!")
    res.status(403).json({msg: error.message})
  }

  next();
}

export default checkAuth;