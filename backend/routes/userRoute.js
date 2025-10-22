import express from 'express'
import { getUserData } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const userRouter=express.Router();

userRouter.get('/userData',authMiddleware,getUserData)





export default userRouter