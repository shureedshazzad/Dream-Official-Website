import path from 'path';
import express from 'express';
import dotenv from 'dotenv';


import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import donorRoute from './routes/donorRoute.js';
import uploadRoute from './routes/uploadRoute.js';
import bloodRequestRoute from './routes/bloodRequestRoute.js'
import doctorRoutes from  './routes/doctorRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'



const port = process.env.PORT || 5000;


connectDB(); // connect to mongodb

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Api is running');
});





app.use('/api/donors', donorRoute); // donorRoute
app.use('/api/upload', uploadRoute); // uploadRoute
app.use('/api/publicbloodrequest',bloodRequestRoute);//public blood request
app.use('/api/doctors',doctorRoutes);//doctor routes
app.use('/api/appointments',appointmentRoutes);

const __dirname = path.resolve(); // set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Sever is running on port ${port}`));





