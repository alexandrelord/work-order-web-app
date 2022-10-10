/** Custom Components */
import WorkOrdersTable from './Table/WorkOrdersTable';
import AlertMessage from '../../AlertMessage';

/** Types */
import { IWorkOrder } from '../../../types';

/** Custom Hook */
import useFetch from '../../../hooks/useFetch';

const WorkOrders = () => {
    const { data: workOrders, errorMsg } = useFetch<IWorkOrder[]>('/api/workorders', 'GET');
    console.log(workOrders);
    return (
        <div>
            {errorMsg && <AlertMessage errorMsg={errorMsg} />}
            {workOrders && <WorkOrdersTable workOrders={workOrders} />}
        </div>
    );
};

export default WorkOrders;
