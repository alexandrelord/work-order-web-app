import express, { Request, Response, NextFunction, Express } from 'express';
import chalk from 'chalk';
import logger from './utils/logger';

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
app.use('/api/workorders', require('./routes/WorkOrder'));
app.use('/api/productivity', require('./routes/Productivity'));
app.use('/api/users', require('./routes/User'));

/** Health Check */
app.get('/ping', (req: Request, res: Response) => res.status(200).json({ message: 'pong' }));

/** Error handling */
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found');
    return res.status(404).json({
        message: error.message
    });
});

/**  Server */
const PORT = 4000;
app.listen(PORT, () => {
    console.log(chalk.yellow(`Server is running on port ${PORT}`));
});
