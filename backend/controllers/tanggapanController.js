import asyncHandler from "express-async-handler"
import Tanggapan from '../models/tanggapanModels.js'
import Pengaduan from '../models/pengaduanModels.js'
import Msyrkt from '../models/masyarakatModels.js'


//@desc Menaggapi
//@route Update /api/tanggapan/:id/tanggapi
//@access Private/Admin&&Petugas
const addTanggapan = asyncHandler(async(req,res) => {
    const{
        tanggapan
    } = req.body
    const pengaduan = await Pengaduan.findById(req.params.id)
    if(pengaduan){
        const addTanggapan = new Tanggapan({
            tanggapan,
            pengaduan:pengaduan._id,
            petugas:req.admin._id
        })
        const respons = await addTanggapan.save()
        res.json(respons)
    }else{
        res.status(404)
        throw new Error('Data Pengaduan not found')
    }
 })

//@desc Get All Report
//@route GET /api/pengaduan/dataPengaduan
//@access Private/Admin&&Petugas
const getDataMenanggapi = asyncHandler(async(req,res) => {
    const allMenaggapi = await Tanggapan.find({})
                            .populate(' petugas', 'id name')
                            .populate(' pengaduan', 'id isi_laporan masyarakat image status')

     res.json(allMenaggapi)
 })


 //@desc Get Data sesuai pengaduan User
//@route GET /api/pengaduan/dataPengaduan
//@access Private/Admin&&Petugas
const getDataMenanggapiUser = asyncHandler(async(req,res) => {
    const allMenaggapi = await Tanggapan.find({pengaduan:req.params.id})
    .populate(' petugas', 'id name')
    .populate(' pengaduan', 'id isi_laporan status ')

res.json(allMenaggapi)
 })

 //@desc DELETE pengaduan user
//@route DELETE /api/user/:id
//@access Private/Admin
const deletePengaduanTang = asyncHandler(async(req,res) => {
    const report = await Pengaduan.findById(req.params.id)
    
    if(report){
        await report.remove()
        res.json({message:'report Removed'})
    }else{
        res.status(404)
        throw new Error('report not Found')
    }
 })

 //@desc DELETE tanggapon user
//@route DELETE /api/user/:id
//@access Private/Admin
const deleteTanggapan = asyncHandler(async(req,res) => {
    const report = await Tanggapan.findById(req.params.id)
    
    if(report){
        await report.remove()
        res.json({message:'tanggapan Removed'})
    }else{
        res.status(404)
        throw new Error('tanggapan not Found')
    }
 })

 //@desc menampilkan all data sesuai 
//@route GET /api/pengaduan/
//@access private
const getPengaduanDetails = asyncHandler(async(req,res) => {
    const pengaduan = await Pengaduan.findById(req.params.id)
    
    if(pengaduan){
        res.json(pengaduan);
    }else{
        res.status(404)
        throw new Error ("pengaduan not found")
    }
})

export {
    addTanggapan,
    getDataMenanggapi,
    deletePengaduanTang,
    getPengaduanDetails,
    getDataMenanggapiUser,
    deleteTanggapan
}