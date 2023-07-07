import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

connectDB();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const port = 5000;
import cors from 'cors';

app.use(cors());

app.get('/',(req,res)=>{
    res.send('API is running');
})

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen({port},()=>{
    console.log(`${port} listening on`);
})