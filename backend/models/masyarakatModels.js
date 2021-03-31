import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const masyarakatSchema = mongoose.Schema({
    nik:{
        type:String,
        required:true,
        unique: true
    },
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    tlpn:{
        type:String,
        required:true,
    },
},{
    timestamps : true
})

masyarakatSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

masyarakatSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Masyarakat = mongoose.model("Masyarakat",masyarakatSchema)

export default Masyarakat