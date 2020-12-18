import express from 'express';
import * as notesController from '../controllers/notesController.js';
import { authenticateAccessToken } from '../../util/accessTokenUtil.js';

const notesRouter = new express.Router();

notesRouter.use(authenticateAccessToken);

notesRouter.get('/all', notesController.allNotes);
notesRouter.post('/create', notesController.createNote);
notesRouter.delete('/delete', notesController.deleteNote);
notesRouter.post('/update', notesController.updateNote);


export { notesRouter };