import express from "express";
import cors from "cors";
import {connectDB} from './config/db.js'
import foodRouter from "./routes/foodroute.js";

//app config
const app =express();
const port = 4000

//middleware
app.use(express.json())
app.use(cors())


//db connection
connectDB();


//api end point
app.use("/api/food",foodRouter);
//mount the folder this
app.use("/images",express.static('uploads'))   //http://localhost:4000/images/1751469511025food_21.png get the image



app.get("/",(req,res)=>{
    res.send("API working")
})
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

