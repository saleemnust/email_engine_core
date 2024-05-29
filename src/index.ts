// src/index.ts

import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes';
import { connectElasticsearch } from './services/elasticsearchService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.set('views', './src/views');
app.set('view engine', 'html');

connectElasticsearch();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
