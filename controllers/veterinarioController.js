import Veterinary from "../models/Veterinary.js";

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

    return res.status(201).json({
      status:'Success',
      msg:'Veterinario registrado con exito!',
      veterinary:veterinarySaved.name
    })
    
  } catch (error) {
    res.json({msg:'Error al registrar veterinario...'})
    console.log(error)
  }
}  
/*************************************************************************/
export const profile = async(req, res)=>{
  res.json({msg:'Mostrando perfil...'})
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