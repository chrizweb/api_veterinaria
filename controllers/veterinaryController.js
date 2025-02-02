import Veterinary from "../models/Veterinary.js";
import generateJWT from "../helpers/generateJwt.js";
import generateId from "../helpers/generateId.js";

/*************************************************************************/
export const register = async(req, res)=>{
  const {email} = req.body
  const userExists = await Veterinary.findOne({email})

  if(userExists){
    return res.status(400).json({
      status:'Error!',
      msg:`El usuario con email [ ${userExists.email} ] ya existe!`
    })
  }

  try {
    const veterinary = new Veterinary(req.body)
    const veterinarySaved = await veterinary.save()

     
    
  } catch (error) {
    res.json({msg:'Error al registrar veterinario...'})
    console.log(error)
  }
}
  
/*************************************************************************/
export const profile = async(req, res)=>{
  /*req.veterinary -> creara una secion con la informacion de vetrinario*/
  const {veterinary} = req
  res.json({Perfil:veterinary})
 
}
/*************************************************************************/
export const confirm = async(req, res)=>{
  const {token} = req.params
  const confirmUser = await Veterinary.findOne({token})

  if(!confirmUser){
    return res.status(404).json({
      status:'Error',
      msg:'Token no valido...!'
    })
  }

  try {
    confirmUser.token = null
    confirmUser.confirmed = true

    const confirmedUser = await confirmUser.save()

    return res.status(200).json({
      status:'Success',
      msg:'Usuario confirmado con exito...!',
      user:confirmedUser.name
    })
    
  } catch (error) {
    console.log(error)
  }

}
/*************************************************************************/
export const auth = async(req, res)=>{
  const {email, password} = req.body
  /*Comprobar si el usuario existe*/
  const user = await Veterinary.findOne({email})

  if(!user){
    return res.status(404).json({
      status:'Error',
      msg:'El usuario no existe...!'
    })
  }

  
  /*Comprobar si el usuario es confirmado*/
  if(!user.confirmed){
    const error = new Error('Tu cuenta no ha sido confirmada...!')
    return res.status(403).json({
      status:'Error',
      msg:error.message
    })
  }

  /*Revisar password*/
  if(await user.checkPassword(password)){
   
    /*Autenticar*/
      res.json({token:generateJWT(user._id)})
  }else{
    const error = new Error('Contraseña incorrecta...!')
    return res.status(403).json({
      status:'Error',
      msg:error.message
    })
  }

}
/*************************************************************************/
export const forgetPassword = async(req, res)=>{
  const {email} = req.body

  const veterinaryExists = await Veterinary.findOne({email})
  if(!veterinaryExists){
    return res.status(404).json({
      status:'Error',
      msg:'El usuario no existe'
    })
  }

  try {
    veterinaryExists.token = generateId()
    await veterinaryExists.save()
    res.json({msg:'Hemos enviado un email con las instrucciones'})
    
  } catch (error) {
    console.log(error)
  }

}
/*************************************************************************/
export const checkPassword = async(req, res)=>{
  const {token} = req.params

  const validToken = await Veterinary.findOne({token})
  if(validToken){
    return res.status(200).json({
      status:'Success',
      msg:'Token valido, el usuario existe!'
    })
  
    
  }else{
    return res.status(400).json({
      status:'Error',
      msg:'Token no valido!'
    })
  }
}
/*************************************************************************/
export const newPassword = async(req, res)=>{
  const {token} = req.params
  const {password} = req.body

  const veterinary = await Veterinary.findOne({token})
  if(!veterinary){
    const error = new Error('Hubo un error')
    return res.status(400).json({
      status:'Error',
      msg:error.message
    })
  }
  try {
    veterinary.token = null
    veterinary.password = password
    await veterinary.save()

    return res.status(200).json({
      status:'Success',
      msg:'Password modificado correctamente!'
    })
    
  } catch (error) {
    console.log(erro)
  }
}
