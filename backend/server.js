import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import authRouter from './routes/authRoute.js';
import cookieParser from "cookie-parser";
import userRouter from './routes/userRoute.js';

//local test
// const allowedOrigins=['http://localhost:5173','http://localhost:5174']
//render test
const allowedOrigins=['https://doctor-app-admin-9qms.onrender.com','https://doctor-app-frontend-8tiq.onrender.com']

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}))

//api endpoints
app.use('/api/admin',adminRouter)

app.use('/api/doctor',doctorRouter)

app.use('/api/auth',authRouter)

app.use('/api/user',userRouter)

app.get('/',(req,res)=>{res.send('API WORKING')})



app.listen(port,()=>console.log('server started',port))