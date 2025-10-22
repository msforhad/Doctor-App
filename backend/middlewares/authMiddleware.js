import jwt from 'jsonwebtoken'
import 'dotenv/config'

const authMiddleware = async (req,res,next)=>{
  // aita use korle server.js file cookie-parser use korte hobe
    const {token}=req.cookies;

    if(!token){
      return res.json({success:false,message:'Not Authorized Login again'})
    }
  try {
    const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);

    if(tokenDecode.id){
      req.userId=tokenDecode.id
    }else{
      return res.json({success:false,message:'not authorized.Login again'});
    }
    next();

  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
}
export default authMiddleware;