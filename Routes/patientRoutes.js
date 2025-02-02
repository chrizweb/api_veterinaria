import express from "express";
import checkAuth from '../middleware/authMiddleware.js'
import * as  patient from '../controllers/patientController.js'

const router = express.Router()      

router.route('/')
.post(checkAuth, patient.createPatient)
.get(checkAuth, patient.getPatients)

router.route('/:id')
.get(checkAuth, patient.getPatientId)
.put(checkAuth, patient.updatePatient)
.delete(checkAuth, patient.deletePatient)

export default router 