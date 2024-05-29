// src/controllers/authController.ts

import { Request, Response } from 'express';
import axios from 'axios';
// @ts-ignore
import querystring from 'querystring';
import User from '../models/user';

export const loginWithOutlook = (req: Request, res: Response) => {
    const oauthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&response_mode=query&scope=offline_access user.read mail.read`;
    res.redirect(oauthUrl);
};

export const outlookCallback = async (req: Request, res: Response) => {
    const { code } = req.query;

    const tokenResponse = await axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', querystring.stringify({
        grant_type: 'authorization_code',
        code: "code",
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const { access_token, refresh_token } = tokenResponse.data;

    // Save user details and tokens in the database
    const user = new User({
        accessToken: access_token,
        refreshToken: refresh_token
    });

    await user.save();

    res.send('Authentication successful');
};
