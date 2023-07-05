import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 5000;
import cors from 'cors';

app.use(cors());

app.get('/',(req,res)=>{
    res.send('API is running');
})

app.get('/api/products',(req,res)=>{
    res.json({products});
})

app.get('/api/products/:id',(req,res)=>{
    const {id} = req.params;
    const product = products.find((p)=> p._id === id)
    res.json({product});
})

app.listen({port},()=>{
    console.log(`${port} listening on`);
})