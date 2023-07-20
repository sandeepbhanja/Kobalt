import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/orderRoutes.js";
import path from 'path';
import { fileURLToPath } from "url";
connectDB();
const app = express();

const __dirname = path.resolve();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res, next) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if(process.env.NODE_ENV ==='production'){
   app.use(express.static(path.join(__dirname, '/frontend/build')));
   app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
   })
}
else{
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`${port} listening on`);
});
