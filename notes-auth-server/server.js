import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
import './api/model/authModel.js';
import {authRouter} from './api/routes/authRoutes.js';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth'); 

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRouter);

app.listen(port);
