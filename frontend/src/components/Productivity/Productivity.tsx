import { FunctionComponent, useState, useEffect } from 'react';

/** Service Functions */
import { getProductivity } from '../../api/productivity';

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
                const response = await getProductivity();
                response.status === 200 && setProductivity(response.users);
                response.status === 404 && setErrorMsg(response.message);
            } catch (error) {
                setErrorMsg('Something went wrong. Please try again later.');
            }
        })();
    }, []);

    return <div>{productivity.length > 0 ? <ProductivityTable productivity={productivity} /> : <AlertMessage errorMsg={errorMsg} />}</div>;
};

export default Productivity;
