// src/services/emailService.ts

import axios from 'axios';
import { client } from './elasticsearchService';
import { elasticsearchConfig } from '../config';

export const fetchEmails = async (accessToken: string) => {
    const response = await axios.get('https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const emails = response.data.value;

    for (const email of emails) {
        await client.index({
            index: elasticsearchConfig.indexEmail,
            id: email.id,
            body: email
        });
    }
};
