import express from "express";
const router = express.Router()

import * as  veterinary from '../controllers/veterinaryController.js'
import checkAuth from '../middleware/authMiddleware.js'

router.post('/', veterinary.register)
router.get('/confirmar/:token', veterinary.confirm)
router.post('/login', veterinary.auth)
router.post('/olvide-password', veterinary.forgetPassword)
router.get('/olvide-password/:token', veterinary.checkPassword)
router.post('/olvide-password/:token', veterinary.newPassword)


router.get('/perfil', checkAuth, veterinary.profile)

export default router  