import express from 'express'
const router = express.Router()
import {
    registerMasyarakat,
    authMasyarakat,
    getMasyarakatProfile,
    updateMasyarakatProfile,
    getAllMasyarakat,
    deleteUser
} from '../controllers/masyarakatController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

router
    .route('/')
    .get(protect,admin,getAllMasyarakat)
    .post(registerMasyarakat)
router
    .route('/login')
    .post(authMasyarakat)
    
router
    .route('/:id')
    .delete(protect,admin,deleteUser)

router
    .route('/:id/profile')
    .get(protect,getMasyarakatProfile)
    .put(protect,updateMasyarakatProfile)

    

export default router