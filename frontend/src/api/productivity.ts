const BASE_URL = '/api/productivity';

export const getProductivity = async () => {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    };

    const response = await fetch(BASE_URL, options);
    return response.json();
};
