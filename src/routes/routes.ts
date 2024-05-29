// src/routes/routes.ts

import { Router } from 'express';
import { loginWithOutlook, outlookCallback } from '../controllers/authController';
import { syncEmails } from '../controllers/syncController';

const router = Router();

router.post('/auth/outlook', loginWithOutlook);
router.get('/auth/outlook/callback', outlookCallback);
router.post('/sync', syncEmails);

export default router;
