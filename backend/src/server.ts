import express, { Request, Response, NextFunction, Express } from 'express';
import chalk from 'chalk';
import logger from './utils/logger';

import productivityRoutes from './routes/Productivity';
import userRoutes from './routes/User';
import workOrderRoutes from './routes/WorkOrder';

const app: Express = express();

/** Middleware */
app.use(logger);
// for parsing application/json - parses incoming JSON requests and puts the parsed data in the request body
app.use(express.json());

/** Rules of our API */
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
app.use('/api/workorders', workOrderRoutes);
app.use('/api/productivity', productivityRoutes);
app.use('/api/users', userRoutes);
app.use((req: Request, res: Response) => {
    const error = new Error('Not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Health Check */
app.get('/ping', (req: Request, res: Response) => res.status(200).json({ message: 'pong' }));

/** Error Handling */

/**  Server */
const PORT = 4000;
app.listen(PORT, () => {
    console.log(chalk.yellow(`Server is running on port ${PORT}`));
});
