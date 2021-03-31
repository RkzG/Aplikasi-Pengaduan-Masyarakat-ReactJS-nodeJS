import asyncHandler from "express-async-handler"
import generateToken from "../utils/generatorToken.js"
import Petugas from '../models/petugasModels.js'

//@desc Auth Admin && get Token
//@route POST /api/petugas/login
//@access Public
const authPetugas = asyncHandler(async(req,res) => {
    const {username,password} = req.body

    const admin = await Petugas.findOne({username})
    if(admin && (await admin.matchPassword(password))){

        res.json({
            message:`Selamat datang Petugas ${admin.level}`,
                        _id: admin._id,
                        name: admin.name,
                        username: admin.username,
                        level: admin.level,
                        token: generateToken(admin._id),
        })
    }else{
        res.status(401)
        throw new Error('Invalid username or password')
    }
})

//@desc Register masyarakat baru
//@route post /api/masyarakat
//@access Public
const registerPetugas = asyncHandler(async(req,res) => {
    const {name,username,password,tlpn} = req.body

    const adminExist = await Petugas.findOne({username})
    if(adminExist){
        res.status(400)
        throw new Error("User already exist")
    }
    const admin = await Petugas.create({
        name,
        username,
        password,
        level : 'Petugas',
        tlpn
    })
    if(admin){
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            username: admin.username,
            level: admin.level,
            tlpn: admin.tlpn,
            token: generateToken(admin._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid admin data')
    }
})

//@desc Petugas Profile
//@route GET /api/masyarakat/Profile
//@access Private/prtugas
const getPetugasProfile = asyncHandler(async(req,res) => {
    const admin = await Petugas.findById(req.params.id)
    if(admin){
        res.json(admin)
    }else{
        res.status(404)
        throw new Error('Admin not Found')
    }
 })

//@desc Update Admin 
//@route PUT /api/masyarakat/:id
//@access Private
const updatePetugasProfile= asyncHandler(async(req,res) => {
const admin = await Petugas.findById(req.params.id)
if(admin){
    admin.name = req.body.name || admin.name
    admin.username = req.body.username || admin.username
    admin.tlpn = req.body.tlpn || admin.tlpn
    admin.password = req.body.password || admin.password

    const updateAdmin = await admin.save()
    res.json({
        _id: updateAdmin._id,
        name: updateAdmin.name,
        username: updateAdmin.username,
        tlpn: updateAdmin.tlpn,
        password: updateAdmin.password
    })
}else{
    res.status(404)
    throw new Error('User Not Found')
}
})
//@desc Update Admin 
//@route PUT /api/masyarakat/:id
//@access Private
const updatePetugasLevel= asyncHandler(async(req,res) => {
const admin = await Petugas.findById(req.params.id)
if(admin){
    admin.level = req.body.level || admin.level

    const updateAdmin = await admin.save()
    res.json({
        _id: updateAdmin._id,
        level: updateAdmin.level,
        message:'Berhasil Update Level'
    })
}else{
    res.status(404)
    throw new Error('User Not Found')
}
})

//@desc All Admin 
//@route GET /api/masyarakat/
//@access Private
const getAllPetugas = asyncHandler(async(req,res) => {
    const admin = await Petugas.find()
    if(admin){
        res.json(admin)
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
 })

//@desc DELETE Petugas
//@route DELETE /api/petugas/:id
//@access Private/Admin
const deleteAdmin = asyncHandler(async(req,res) => {
    const Admin = await Petugas.findById(req.params.id)
    
    if(Admin){
        await Admin.remove()
        res.json({message:'Admin Removed'})
    }else{
        res.status(404)
        throw new Error('Admin not Found')
    }
 })

export {
    registerPetugas,
    authPetugas,
    getPetugasProfile,
    updatePetugasProfile,
    getAllPetugas,
    deleteAdmin,
    updatePetugasLevel
}