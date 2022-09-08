import { FunctionComponent, useState, useEffect } from 'react';

/** Service Functions */
import { getWorkOrders } from '../../api/workorders';

/** Custom Components */
import WorkOrdersTable from './WorkOrdersTable';
import AlertMessage from '../AlertMessage';

/** Types */
import { IWorkOrder } from '../../types';

const WorkOrders: FunctionComponent = () => {
    const [workorders, setWorkorders] = useState<IWorkOrder[]>([] as IWorkOrder[]);
    const [errorMsg, setErrorMsg] = useState<string>(''); // create useHook since it appears in multiple places? or too simple for that?

    useEffect(() => {
        (async () => {
            try {
                const response = await getWorkOrders();
                response.status === 200 && setWorkorders(response.workOrders);
            } catch (error) {
                setErrorMsg('Something went wrong. Please try again later.');
                // setErrorMsg(error.message); // receive error message from backend?
            }
        })();
    }, []);

    return <div>{workorders.length > 0 ? <WorkOrdersTable workorders={workorders} /> : <AlertMessage errorMsg={errorMsg} />}</div>;
};

export default WorkOrders;
