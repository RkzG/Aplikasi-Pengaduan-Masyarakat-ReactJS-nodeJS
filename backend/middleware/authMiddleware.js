import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Msyrkt from '../models/masyarakatModels.js'
import Petugas from '../models/petugasModels.js'

const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        req.user = await Msyrkt.findById(decoded.id).select('-password');
        req.admin = await Petugas.findById(decoded.id).select('-password');
 
        console.log(req.user);
  
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }
  
    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  });

const admin = (req,res,next)=>{
    if(req.admin.level == "Admin" || "Petugas"){
        next()
    }else{
        res.status(401)
        throw new Error('Not Authorized as an Admin')
    }
}

export {protect,admin}