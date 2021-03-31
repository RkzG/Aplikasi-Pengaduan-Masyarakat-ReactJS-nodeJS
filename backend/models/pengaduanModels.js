import mongoose from "mongoose";

const pengaduanSchema = mongoose.Schema({
    masyarakat:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Masyarakat'
    },
    isi_laporan:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true
    },
},{
    timestamps : true
})


const Pengaduan = mongoose.model("Pengaduan",pengaduanSchema)

export default Pengaduan