import foodModel from "../models/foodModel.js";
import fs from 'fs'; //file system

// add food item

const addFood = async (req,res)=>{
    let image_filename= `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price:req.body.price,
        category: req.body.category,
        image:image_filename
    })

    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//all food list
const listFood = async(req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});

    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"});
    }
}


//remove food item
const removefood= async (req,res)=>{
    try{
        const foods = await foodModel.findById(req.body.id);
        if (!foods) {
            return res.json({ success: false, message: "Food not found" });
        }

        // Delete image file from 'uploads' folder
        fs.unlink(`uploads/${foods.image}`, (err) => {
            if (err) console.error("File deletion error:", err);
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed" });
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"});
    }
}


export {addFood,listFood,removefood}