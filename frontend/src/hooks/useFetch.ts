import { useState, useEffect } from 'react';
import { api } from '../services/api';

const useFetch = <T>(url: string, method: string) => {
    const [data, setData] = useState<T | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await api({ url, method });
                console.log(response);
                setData(response.data);
            } catch (error) {
                error instanceof Error && setErrorMsg(error.message);
            }
        })();
    }, [url, method]);

    return { data, errorMsg, setErrorMsg };
};

export default useFetch;
