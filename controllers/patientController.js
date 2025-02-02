import Patient from "../models/Patient.js"

/***************************************************************************/
export const createPatient = async (req, res) =>{
 
  const patient = new Patient(req.body) 
  patient.veterinary = req.veterinary._id

  try {
    const savedPatient = await patient.save()
     
    return res.status(201).json({
      status:'Susccess',
      msg:'Paciente registrado con exito!',
      savedPatient
    })
    
  } catch (error) {
    console.log(error)
  }
}
/***************************************************************************/
export const getPatients = async (req, res) =>{
  const patients = await Patient.find()
  .where("veterinary")
  .equals(req.veterinary)

  res.json(patients)
}
/***************************************************************************/
export const getPatientId = async(req, res) =>{
  const {id} = req.params
  const patient = await Patient.findById(id)

  if(!patient){
    return res.status(400).json({
      status:'Error',
      msg:'No encontrado'
    })
  }

  if(patient.veterinary._id.toString() !== req.veterinary._id.toString()){
    return res.status(403).json({
      status:'Error',
      msg:'Acción no valida'
    })
  }

    return res.status(200).json({
      status:'Success',
      patient
    })
  
}
/***************************************************************************/
export const updatePatient = async(req, res) =>{
  const {id} = req.params
  const patient = await Patient.findById(id)

  if(!patient){
    return res.status(400).json({
      status:'Error',
      msg:'No encontrado'
    })
  }

  if(patient.veterinary._id.toString() !== req.veterinary._id.toString()){
    return res.status(403).json({
      status:'Error',
      msg:'Acción no valida'
    })
  }

  patient.name = req.body.name || patient.name
  patient.owner = req.body.owner || patient.owner
  patient.email = req.body.email || patient.email
  patient.date = req.body.date || patient.date
  patient.symptom = req.body.symptom || patient.symptom

  try {
    const updatedPatient = await patient.save()
    return res.status(200).json({
      status:'Success',
      updatedPatient
    })

  } catch (error) {
    console.log(error)
  }
  
}
/***************************************************************************/
export const deletePatient = async(req, res) =>{
  const {id} = req.params
  const patient = await Patient.findById(id)

  if(!patient){
    return res.status(400).json({
      status:'Error',
      msg:'No encontrado'
    })
  }

  if(patient.veterinary._id.toString() !== req.veterinary._id.toString()){
    return res.status(403).json({
      status:'Error',
      msg:'Acción no valida'
    })
  }

  try {
    await patient.deleteOne()
    return res.status(200).json({
      status:'Success',
      msg:`Paciente ${patient.name} Eliminado!`
    })
    
  } catch (error) {
    console.log(error)
  }

}
/***************************************************************************/




















