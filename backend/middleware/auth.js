import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const authMiddleware = async(req,res,next)=>{
    const {token} =req.headers;
    if(!token){
        return res.json({success:false,message:"Not authorizeed login again"})
    }
    try{
        const token_decode =jwt.verify(token,process.env.JWT_SECRET)
        req.user = { id: token_decode.id };
        next();
    }catch(error){
        console.log(error)
        return res.json({success:false,message:error})
    }
}

export default authMiddleware;