// src/services/elasticsearchService.ts

import { Client } from '@elastic/elasticsearch';
import { elasticsearchConfig } from '../config';

export const client = new Client({ node: elasticsearchConfig.node });

export const connectElasticsearch = async () => {
    try {
        await client.ping();
        console.log('Connected to Elasticsearch');
        // Create indices if they don't exist
        await createIndex(elasticsearchConfig.indexEmail, emailProperties);
        await createIndex(elasticsearchConfig.indexMailbox, mailboxProperties);
    } catch (error) {
        console.error('Elasticsearch connection failed', error);
    }
};

const createIndex = async (index: string, properties: any) => {
    const exists = await client.indices.exists({ index });
    if (!exists) {
        await client.indices.create({
            index,
            body: {
                mappings: {
                    properties: properties
                }
            }
        });
    }
};

// Define properties for email and mailbox indices
const emailProperties = {
    subject: { type: 'text' },
    from: {
        properties: {
            emailAddress: { type: 'keyword' },
            name: { type: 'text' }
        }
    },
    to: {
        type: 'nested',
        properties: {
            emailAddress: { type: 'keyword' },
            name: { type: 'text' }
        }
    },
    cc: {
        type: 'nested',
        properties: {
            emailAddress: { type: 'keyword' },
            name: { type: 'text' }
        }
    },
    bcc: {
        type: 'nested',
        properties: {
            emailAddress: { type: 'keyword' },
            name: { type: 'text' }
        }
    },
    body: { type: 'text' },
    date: { type: 'date' },
    isRead: { type: 'boolean' }
};

const mailboxProperties = {
    name: { type: 'text' },
    emailAddress: { type: 'keyword' },
    folder: {
        type: 'nested',
        properties: {
            id: { type: 'keyword' },
            name: { type: 'text' },
            parentFolderId: { type: 'keyword' }
        }
    }
};
