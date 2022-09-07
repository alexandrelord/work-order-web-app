const BASE_URL = '/api/users';

export const getUsers = async () => {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    };

    const response = await fetch(BASE_URL, options);
    return response.json();
};
