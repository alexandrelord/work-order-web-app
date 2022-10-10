/** Custom Components */
import ProductivityTable from './Table/ProductivityTable';
import AlertMessage from '../AlertMessage';

/** Types */
import { IUser } from '../../types';

/** Custom Hook */
import useFetch from '../../hooks/useFetch';

const Productivity = () => {
    const { data: users, errorMsg } = useFetch<IUser[]>('/api/productivity', 'GET');
    return (
        <div>
            {errorMsg && <AlertMessage errorMsg={errorMsg} />}
            {users && <ProductivityTable users={users} />}
        </div>
    );
};

export default Productivity;
