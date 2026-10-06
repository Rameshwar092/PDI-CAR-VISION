import express from 'express';

import {
  firebaseLogin
} from '../controller/authControllers.js';

const router = express.Router();

router.post('/firebase-login', firebaseLogin);

export default router;