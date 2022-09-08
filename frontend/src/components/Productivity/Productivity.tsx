import { FunctionComponent, useState, useEffect } from 'react';

/** Service Functions */
import { api } from '../../services/api';

/** Custom Components */
import ProductivityTable from './ProductivityTable';
import AlertMessage from '../AlertMessage';

/** Types */
import { IUser } from '../../types';

const Productivity: FunctionComponent = () => {
    const [productivity, setProductivity] = useState<IUser[]>([]);
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                const response = await api({ url: '/api/productivity', method: 'GET' });
                response.users && setProductivity(response.users);
            } catch (error) {
                error instanceof Error && setErrorMsg(error.message);
            }
        })();
    }, []);

    return <div>{productivity.length > 0 ? <ProductivityTable productivity={productivity} /> : <AlertMessage errorMsg={errorMsg} />}</div>;
};

export default Productivity;
