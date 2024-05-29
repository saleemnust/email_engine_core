// src/controllers/syncController.ts

import { Request, Response } from 'express';
import { fetchEmails } from '../services/emailService';

export const syncEmails = async (req: Request, res: Response) => {
    const { userId } = req.body;
    // Fetch access token from DB (mocked for this example)
    const accessToken = 'user_access_token';
    await fetchEmails(accessToken);
    res.send('Email synchronization started');
};
