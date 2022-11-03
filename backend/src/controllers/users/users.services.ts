import sql from '../../db';
import { StatusError } from '../../services/global.services';

export const queryUsers = async () => {
    const response = await sql('SELECT * FROM users');
    if (!response.length) {
        throw new StatusError('No users found.', 404);
    }
    return response;
};
