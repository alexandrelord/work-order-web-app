import { Request, Response, NextFunction } from 'express';
import sql from '../db';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get all users
        const response: any = await sql('SELECT * FROM users');

        if (response.length > 0) {
            return res.status(200).json({ users: response });
        } else {
            return res.status(404).json({ message: 'No users found' });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export { getUsers };
