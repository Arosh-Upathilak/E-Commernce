import express from "express";
import { addFood, listFood, removefood } from "../controllers/foodcontrollers.js";
import multer from "multer";  //image storage

const foodRouter = express.Router();

//Image storage Engine
const storage =multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)  //file name will be unique
    }
})
const upload = multer({storage:storage})


foodRouter.post('/add',upload.single("image"),addFood)
foodRouter.get('/list',listFood)
foodRouter.post('/remove',removefood)

export default foodRouter;