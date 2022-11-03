import { Request, Response } from 'express';
import { queryUsers } from './users.services';
import { StatusError } from '../../services/global.services';

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await queryUsers();
        res.status(200).json({ data: users });
    } catch (error) {
        if (error instanceof StatusError) {
            res.status(error.status).send(error.message);
        } else {
            throw error;
        }
    }
};

export { getUsers };
