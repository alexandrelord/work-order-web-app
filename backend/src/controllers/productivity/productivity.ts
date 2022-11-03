import { Request, Response } from 'express';
import { queryInactiveUsers } from './productivity.services';
import { StatusError } from '../../services/global.services';

export const getInactiveUsers = async (req: Request, res: Response) => {
    try {
        const users = await queryInactiveUsers();

        return res.status(200).json({ data: users });
    } catch (error) {
        if (error instanceof StatusError) {
            res.status(error.status).send(error.message);
        } else {
            throw error;
        }
    }
};
