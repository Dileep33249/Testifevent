import express from 'express';
import { login, signup } from '../methods/user.js';

const route  = express.Router();
route.put('/signup', signup);
route.post('/login', login);

export default route;