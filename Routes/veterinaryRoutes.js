import express from "express";
const router = express.Router()

import * as  ctrVeterinary from '../controllers/veterinarioController.js'

router.post('/', ctrVeterinary.register)
router.get('/perfil', ctrVeterinary.profile)
router.get('/confirmar/:token', ctrVeterinary.confirm)

export default router