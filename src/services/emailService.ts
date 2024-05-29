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
    const bulkBody = [];

    for (const email of emails) {
        bulkBody.push({ index: { _index: elasticsearchConfig.indexEmail, _id: email.id } });
        bulkBody.push(email);
    }

    await client.bulk({ body: bulkBody });

};
