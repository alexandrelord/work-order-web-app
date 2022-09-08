interface IResource<T> {
    url: string;
    method: string;
    data?: T;
}

export const api = async <T>(resource: IResource<T>) => {
    const options = {
        method: resource.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resource.data)
    };
    const response = await fetch(resource.url, options);
    if (response.status === 200) {
        return await response.json();
    } else if (response.status === 201) {
        return response;
    } else {
        console.log('error');
    }
};
