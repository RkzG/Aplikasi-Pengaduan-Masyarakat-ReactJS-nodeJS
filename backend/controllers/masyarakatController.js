import asyncHandler from "express-async-handler"
import generateToken from "../utils/generatorToken.js"
import Msyrkt from '../models/masyarakatModels.js'

//@desc Auth masyarakat && get Token
//@route POST /api/masyarakat/login
//@access Public
const authMasyarakat = asyncHandler(async(req,res) => {
    const {username,password} = req.body

    const user = await Msyrkt.findOne({username})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            username: user.username,
            token: generateToken(user._id),
        })
    }else{
        res.status(401)
        throw new Error('Invalid username or password')
    }
})

//@desc Register masyarakat baru
//@route post /api/masyarakat
//@access Public
const registerMasyarakat = asyncHandler(async(req,res) => {
    const {nik,name,username,password,tlpn} = req.body

    const userExist = await Msyrkt.findOne({username})
    if(userExist){
        res.status(400)
        throw new Error("User already exist")
    }
    const user = await Msyrkt.create({
        nik,
        name,
        username,
        password,
        tlpn
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            tlpn: user.tlpn,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc User Profile
//@route GET /api/masyarakat/:id/Profile
//@access Private
const getMasyarakatProfile = asyncHandler(async(req,res) => {
    const user = await Msyrkt.findById(req.params.id)
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
 })
//@desc User 
//@route GET /api/masyarakat/
//@access Private
const getAllMasyarakat = asyncHandler(async(req,res) => {
    const user = await Msyrkt.find()
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
 })

 //@desc Update User
//@route PUT /api/masyarakat/:id
//@access Private
const updateMasyarakatProfile= asyncHandler(async(req,res) => {
    const user = await Msyrkt.findById(req.params.id)
    if(user){
        user.nik = req.body.nik || user.nik
        user.name = req.body.name || user.name
        user.username = req.body.username || user.username
        user.tlpn = req.body.tlpn || user.tlpn
        user.password = req.body.password || user.password

        const updateUser = await user.save()
        res.json({
         _id: updateUser._id,
         name: updateUser.name,
         username: updateUser.username,
         tlpn: updateUser.tlpn,
         password: updateUser.password
     })
    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
 })


 //@desc DELETE user
//@route DELETE /api/user/:id
//@access Private/Admin
const deleteUser = asyncHandler(async(req,res) => {
    const user = await Msyrkt.findById(req.params.id)
    
    if(user){
        await user.remove()
        res.json({message:'User Removed'})
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
 })

export {
    registerMasyarakat,
    authMasyarakat,
    getMasyarakatProfile,
    updateMasyarakatProfile,
    getAllMasyarakat,
    deleteUser
}