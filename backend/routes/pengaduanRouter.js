import express from 'express'
const router = express.Router()
import {
   addPengaduan,
   getDataPengaduan,
   validasiDataPengaduan,
   getPengaduanByUser,
   deletePengaduan,
} from '../controllers/pengaduanController.js'

import {protect,admin} from '../middleware/authMiddleware.js'

router
    .route('/')
    .get(protect,getPengaduanByUser)
    .post(protect,addPengaduan)

router 
    .route('/all')
    .get(protect,admin,getDataPengaduan)
router 
    .route('/:id/validasi')
    .put(protect,admin,validasiDataPengaduan)

router
    .route('/:id')
    .delete(protect,deletePengaduan)

export default router