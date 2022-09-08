import { Request, Response } from 'express';
import sql from '../db';

const getUsers = async (req: Request, res: Response) => {
    try {
        // Get all users
        const response = await sql('SELECT * FROM users');

        if (response.length > 0) {
            return res.status(200).json({ users: response });
        } else {
            return res.status(404).json({ message: 'No users found.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

export { getUsers };
