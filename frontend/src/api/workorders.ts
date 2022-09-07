const BASE_URL = 'http://localhost:4000/api/workorders';

export const getWorkOrders = async () => {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    };

    const response = await fetch(BASE_URL, options);
    return response.json();
};

export const getWorkOrder = async (id: string) => {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    };

    const response = await fetch(`${BASE_URL}/${id}`, options);
    if (response.status === 200) {
        return response.json();
    } else {
        return 'Workorder not found';
    }
};

export const updateWorkOrder = async (id: string, status: string) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status
        })
    };
    const response = await fetch(`${BASE_URL}/${id}`, options);
    if (response.status === 200) {
        return response.json();
    }
};

export const createWorkOrder = async (workorder: any) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(workorder)
    };
    const response = await fetch(`${BASE_URL}/new`, options);

    if (response.status === 201) {
        return response.status;
    } else {
        return 'Error creating workorder';
    }
};
