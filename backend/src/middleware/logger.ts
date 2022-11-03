import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

const dateFormat: object = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

const logger = (req: Request, res: Response, next: NextFunction): void => {
    const date = new Date(Date.now()).toLocaleString('en-GB', dateFormat);
    const method = chalk.white(req.method);
    const url = chalk.white(req.url);
    const status = chalk.greenBright(res.statusCode);
    console.log(`${date} ${method} from ${url} ${status}`);
    next();
};

export default logger;
