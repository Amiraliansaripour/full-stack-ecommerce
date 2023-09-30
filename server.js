import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import connectDB from './config/db.js';
import authRoute from './routes/user/authRoute.js'
import categoryRoutes from './routes/category/categoryRoutes.js'
import smellRoutes from './routes/smell/smellRoutes.js'
import milRoutes from './routes/mil/milRoutes.js'
import productRoutes from './routes/product/productRoutes.js'
import galleryRoutes from './routes/gallery/galleryRoutes.js'

import cors from 'cors'

const app = express();


// congigure env
dotenv.config()

// database config
connectDB();

// middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"))


// routes
app.use('/api/auth', authRoute)
app.use('/api/category', categoryRoutes)
app.use('/api/smell', smellRoutes)
app.use('/api/mil', milRoutes)
app.use('/api/product', productRoutes)
app.use('/api/image',galleryRoutes)

app.use(express.static("public/upload"))


// rest api 
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to Vahid Perfume'
    })
})


// Port 
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} port: ${PORT}`.bgGreen)
}) 



