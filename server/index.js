import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import connectDB from './db/connect.js';
import itemsRoute from './routes/itemsRoute.js';
import usersRoute from './routes/userRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/items/', itemsRoute);
app.use('/api/users/', usersRoute);

const PORT = process.env.PORT || 5000;


const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT,console.log(`Server listening on port 5000`));
    }
    catch(error)
    {
        console.log(error);
    }
}

start();