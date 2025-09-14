import express from "express";
import cors from "cors";
import {connectDB} from './config/db.js'
import foodRouter from "./routes/foodroute.js";
import userRouter from './routes/userroute.js';
import dotenv from "dotenv";
import cartRouter from "./routes/cartroute.js";
dotenv.config()

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

app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)

app.get("/",(req,res)=>{
    res.send("API working")
})
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

