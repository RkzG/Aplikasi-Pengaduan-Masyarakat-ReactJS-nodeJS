import mongoose from "mongoose";

const tanggapanSchema = mongoose.Schema({
    tanggapan:{
        type:String,
        required:true,
    },
    pengaduan:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Pengaduan'
    },
    petugas:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Petugas'
    },
},{
    timestamps : true
})


const Tanggapan = mongoose.model("Tanggapan",tanggapanSchema)

export default Tanggapan