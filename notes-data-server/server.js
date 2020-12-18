import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
import './api/models/notesModel.js';
import { notesRouter } from './api/routes/notesRoutes.js';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/notes');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());


app.use('/notes', notesRouter);


app.listen(port);