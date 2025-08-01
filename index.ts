import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import { env } from './src/environment/environment';
import baseRouter from './src/routes/_base-router';
import { errorHandler } from './src/middleware/error-handler';
import { initCronJobs } from './src/jobs/init-cron';

const app = express();
const port = env.PORT

app.use(express.json());

app.use('', baseRouter);

app.use(errorHandler);

app.listen(port, () => {
    initCronJobs()
    console.log(`Server is running at http://localhost:${port}`);
});