import { FunctionComponent, useState, useEffect } from 'react';

/** Service Functions */
import { getProductivity } from '../../api/productivity';

/** Custom Components */
import ProductivityTable from './ProductivityTable';
import AlertMessage from '../AlertMessage';

const Productivity: FunctionComponent = () => {
    const [productivity, setProductivity] = useState<any>([]);
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                const response = await getProductivity();
                setProductivity(response.response);
                if (productivity.length === 0) {
                    setErrorMsg('No productivity data found');
                }
            } catch (error) {
                setErrorMsg('Something went wrong. Please try again later.');
            }
        })();
    }, []);

    return <div>{productivity.length > 0 ? <ProductivityTable productivity={productivity} /> : <AlertMessage errorMsg={errorMsg} />}</div>;
};

export default Productivity;
