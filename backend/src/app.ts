import express from 'express';
import logger from './utils/logger';
import apiRoutes from './routes/api';

const app = express();

app.use(logger);
app.use(express.json());

app.use('/api', apiRoutes);

export default app;
