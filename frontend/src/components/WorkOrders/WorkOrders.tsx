import { FunctionComponent, useState, useEffect } from 'react';

/** Service Functions */
import { getWorkOrders } from '../../api/workorders';

/** Custom Components */
import WorkOrdersTable from './WorkOrdersTable';
import AlertMessage from '../AlertMessage';

const WorkOrders: FunctionComponent = () => {
    const [workorders, setWorkorders] = useState<any[]>([]);
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                const response = await getWorkOrders();
                setWorkorders(response.workOrders);
                if (response.status === 200) {
                    setWorkorders(response);
                } else if (workorders.length === 0) {
                    setErrorMsg('No work orders found. Vacation time!');
                }
            } catch (error) {
                setErrorMsg('Something went wrong. Please try again later.');
            }
        })();
    }, []);

    return <div>{workorders.length > 0 ? <WorkOrdersTable workorders={workorders} /> : <AlertMessage errorMsg={errorMsg} />}</div>;
};

export default WorkOrders;
