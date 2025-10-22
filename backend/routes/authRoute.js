import express from 'express'
import { isAuth, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyAccount } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const authRouter = express.Router();
authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.post('/send-verify-otp',authMiddleware,sendVerifyOtp)
authRouter.post('/verify-account',authMiddleware,verifyAccount)
authRouter.get('/is-auth',authMiddleware,isAuth)
authRouter.post('/send-reset-otp',sendResetOtp)
authRouter.post('/reset-password',resetPassword)



export default authRouter