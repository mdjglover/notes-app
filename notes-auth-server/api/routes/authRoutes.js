import express from 'express';
import * as authController from '../controllers/authController.js';

const authRouter = new express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/refreshAccessToken', authController.refreshAccessToken);

export { authRouter };

