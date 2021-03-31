import express from 'express'
const router = express.Router()
import {protect,admin} from '../middleware/authMiddleware.js'

import {
    registerPetugas,
    authPetugas,
    getPetugasProfile,
    updatePetugasProfile,
    getAllPetugas,
    deleteAdmin,
    updatePetugasLevel
} from '../controllers/petugasController.js'

router
    .route('/')
    .post(registerPetugas)
    .get(protect,admin,getAllPetugas)

router
    .route('/:id')
    .delete(protect,admin,deleteAdmin)
    .put(protect,admin,updatePetugasLevel)

router
    .route('/login')
    .post(authPetugas)

router
    .route('/:id/profile')
    .get(protect,admin,getPetugasProfile)
    .put(protect,admin,updatePetugasProfile)
    
export default router