import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';

connectDB();
const app = express();
const port = 5000;
import cors from 'cors';

app.use(cors());

app.get('/',(req,res)=>{
    res.send('API is running');
})

app.use('/api/products',productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen({port},()=>{
    console.log(`${port} listening on`);
})