import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

//register
export const register = async(req,res)=>{
  const {name,email,password}=req.body;

  if(!name||!email||!password){
    return res.json({success:false,message:'Missing Details'})
  }

  try {

    //validating email
    if(!validator.isEmail(email)){
      return res.json({success:false,message:'Enter a valid Email'})
    }

    //validating password
    if(password.length<8){
      return res.json({success:false,message:"Enter a Strong password"})
    }

    //hashed password 
    const hashedPassword = await bcrypt.hash(password,10);
    
    //save to db
    const user = new userModel(
      {
        name,
        email,
        password:hashedPassword
      }
    )
    await user.save();

    //sending welcome Email
    const mailOption={
      from:process.env.SENDER_EMAIL,
      to:email,
      subject:'Welcome to Aroggo.Link',
      text:`welcome to Aroggo Link website.your account has been created with email address:${email}`
    }
    await transporter.sendMail(mailOption);

    //token return
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

    res
    .cookie('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite: process.env.NODE_ENV==='production'?'none':'strict',
      maxAge:7*24*60*60*1000
    })
    .json({
      success:true,
      message:'Success fully SignUp',
      token
    })

    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message}) 
  }
}

//login
export const login = async(req,res)=>{
  const {email,password}=req.body;

  if(!email||!password){
    return res.json({success:false,message:'Missing Details '})
  }

  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"Invalid Email"})
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.json({success:false,message:'Incorrect password'})
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

    res
    .cookie('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite: process.env.NODE_ENV==='production'?'none':'strict',
      maxAge:7*24*60*60*1000
    })
    .json({
    success: true,
    message:'Success fully Logged in',
    token
    });

  } catch (error) {
    console.log(error)
    return res.json({success:false,message:error.message})
    
  }
}

//logout
export const logout = async(req,res)=>{
  try {

    res.clearCookie('token',{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite: process.env.NODE_ENV==='production'?'none':'strict',
      maxAge:7*24*60*60*1000
    })
    return res.json({success:true,message:'Success fully logged out'})
    
  } catch (error) {
    console.log(error)
    return res.json({success:false})
    
  }
}

// send verify otp
export const sendVerifyOtp = async(req,res)=>{
  try {
    const {token}=req.cookies;
    const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
    req.userId=tokenDecode.id
    const userId = req.userId;
    const user = await userModel.findById(userId)

    if(!user){
      return res.json({success:false,message:'User Not Found'})
    }

    if(user.isAccountVerified){
      return res.json({success:false,message:'Account already verified'})
    }

    const otp = String(Math.floor(100000+Math.random()*900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt=Date.now()+10*60*1000;
    await user.save();

    const mailOption={
      from:process.env.SENDER_EMAIL,
      to:user.email,
      subject:'Account verification OTP',
      text:`Your otp is ${otp}.verify your account using this otp`
    }

    await transporter.sendMail(mailOption)

    return res.json({success:true,message:'verification otp sent on email.chick your email address'})

  } catch (error) {
    console.log(error)
    return res.json({success:false,message:error.message}) 
  }
}

//verify-account
export const verifyAccount = async(req,res)=>{
    const {otp}=req.body
    const userId=req.userId

    if(!otp||!userId){
      return res.json({success:false,message:'Missing details'})
    }
  try {
    const user = await userModel.findById(userId);

    if(!user){
      return res.json({success:false,message:'user not founded'})
    }

    if(user.verifyOtp===''||user.verifyOtp!==otp){
      return res.json({success:false,message:'Invalid otp'})
    }

    if(user.verifyOtpExpireAt<Date.now()){
      return res.json({success:false,message:'otp Expired'})
    }

    user.isAccountVerified=true;
    user.verifyOtp='';
    user.verifyOtpExpireAt=0;

    await user.save();

    return res.json({success:true,message:'email verified successfully'})

  } catch (error) {
    return res.json({success:false,message:error.message})
    
  }
}

//check if user is authenticated
export const isAuth = async(req,res)=>{
  
  try {
    return res.json({success:true,message:'Your account is authenticated'})
    
  } catch (error) {
    res.json({success:false,message:error.message})
    
  }
}

//send reset otp
export const sendResetOtp = async(req,res)=>{
  const {email}=req.body;
  if(!email){
    return res.json({success:false,message:'Email is required'})
  }
  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:'user not founded'})
    }

    const otp = String(Math.floor(100000+Math.random()*900000));
    user.resetOtp=otp;
    user.resetOtpExpireAt = Date.now()+10*60*1000
    await user.save();

    const mailOption={
      from:process.env.SENDER_EMAIL,
      to:user.email,
      subject:'Password reset otp',
      text:`Your otp for resetting your password is ${otp}.use this otp to proceed with resetting your password.`
    }

    await transporter.sendMail(mailOption)
    return res.json({success:true,message:'otp sent to your email'});
    
  } catch (error) {
    return res.json({success:false,message:error.message})
    
  }
}
//reset password
export const resetPassword = async(req,res)=>{
  const {email,otp,newPassword}=req.body;

  if(!email||!otp||!newPassword){
    return res.json({success:false,message:"Missing details"})
  }

  try {
    const user=await userModel.findOne({email});

    if(!user){
      return res.json({success:false,message:'User not found'});
    }


    if(user.resetOtp===''||String(user.resetOtp)!==String(otp)){
      return res.json({success:false,message:'invalid otp'})
    }

     if(user.resetOtpExpireAt<Date.now()){
      return res.json({success:false,message:"otp expired"})
    }

    const hashedPassword = await bcrypt.hash(newPassword,10);
    user.password=hashedPassword;
    user.resetOtp='';
    user.resetOtpExpireAt=0;
    await user.save();

    return res.json({success:true,message:'password has been reset successfully'})
    
  } catch (error) {
    return res.json({success:false,message:error.message})
    
  }
}