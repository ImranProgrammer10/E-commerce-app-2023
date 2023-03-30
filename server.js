 import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import cors from "cors";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from "./routes/productRoutes.js";
 
 


// configure env
dotenv.config();

// database congig

connectDB();

// rest object
const app=express();

 

// middlewares
app.use(express.json());
 
 app.use(express.json())


// routes

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product', productRoutes);

//rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
  });

// PORT

const PORT=process.env.PORT || 8080;

// run listen

app.listen(PORT,()=>{
    console.log(`server Running on ${process.env.DEV_MODE} mode on port ${PORT}` );
})