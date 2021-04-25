import asyncHandler from "express-async-handler";
import Pengaduan from "../models/pengaduanModels.js";

//@desc Tambah pengaduan
//@route POST /api/order
//@access Private
const addPengaduan = asyncHandler(async (req, res) => {
  const { isi_laporan, image, lokasi, status } = req.body;
  const pengaduan = new Pengaduan({
    masyarakat: req.user._id,
    isi_laporan,
    image,
    lokasi,
    status: "Terkirim",
  });
  const report = await pengaduan.save();
  res.status(201).json(report);
});

//@desc Get All Report
//@route GET /api/pengaduan/dataPengaduan
//@access Private/Admin&&Petugas
const getDataPengaduan = asyncHandler(async (req, res) => {
  const allReport = await Pengaduan.find().populate("masyarakat", "id name");
  if (allReport) {
    res.json(allReport);
  } else {
    res.status(404);
    throw new Error("Data Pengaduan not found");
  }
});

//@desc Validasi
//@route Update /api/pengaduan/:id/validasi
//@access Private/Admin&&Petugas
const validasiDataPengaduan = asyncHandler(async (req, res) => {
  const validasi = await Pengaduan.findById(req.params.id);
  if (validasi) {
    validasi.status = req.body.status || validasi.status;

    const updateValidasi = await validasi.save();
    res.json(updateValidasi);
  } else {
    res.status(404);
    throw new Error("Data Pengaduan not found");
  }
});

//@desc menampilkan all data sesuai user
//@route GET /api/pengaduan/
//@access private
const getPengaduanByUser = asyncHandler(async (req, res) => {
  const pengaduan = await Pengaduan.find({ masyarakat: req.user.id });

  if (pengaduan) {
    res.json(pengaduan);
  } else {
    res.status(404);
    throw new Error("pengaduan not found");
  }
});

//@desc DELETE user
//@route DELETE /api/user/:id
//@access Private/Admin
const deletePengaduan = asyncHandler(async (req, res) => {
  const report = await Pengaduan.findById(req.params.id);

  if (report) {
    await report.remove();
    res.json({ message: "report Removed" });
  } else {
    res.status(404);
    throw new Error("report not Found");
  }
});

export {
  addPengaduan,
  getDataPengaduan,
  validasiDataPengaduan,
  getPengaduanByUser,
  deletePengaduan,
};
