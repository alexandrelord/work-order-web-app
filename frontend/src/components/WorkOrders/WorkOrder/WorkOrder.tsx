import { FunctionComponent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

/** Service Functions */
// import { getWorkOrder, updateWorkOrder } from '../../../services/workorders';
import { api } from '../../../services/api';

/** Custom Components */
import AlertMessage from '../../AlertMessage';

/** CSS module */
import './WorkOrder.css';

/** Types */
import { IWorkOrder, IUser } from '../../../types';

interface IParamsType {
    id: string;
}

const WorkOrder: FunctionComponent = () => {
    const [workOrder, setWorkOrder] = useState<IWorkOrder>({} as IWorkOrder);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const { id } = useParams<IParamsType>();

    useEffect(() => {
        (async () => {
            try {
                const response = await api({ url: `/api/workorders/${id}`, method: 'GET' });
                response.workOrder && setWorkOrder(response.workOrder);
            } catch (error) {
                error instanceof Error && setErrorMsg(error.message);
            }
        })();
    }, []);

    const handleChangeStatus = async () => {
        try {
            const response = await api({ url: `/api/workorders/${id}`, method: 'PATCH', data: { status: workOrder.status === 'OPEN' ? 'CLOSED' : 'OPEN' } });
            response.workOrder && setWorkOrder({ ...workOrder, status: response.workOrder[0].status });
        } catch (error) {
            error instanceof Error && setErrorMsg(error.message);
        }
    };

    const renderWorkOrder = () => {
        return (
            <section>
                <div className="workorder">
                    <div className="header">
                        <p>Work Order #{workOrder.id}</p>
                    </div>

                    <div className="body">
                        <div className="name">
                            <h2>{workOrder.name}</h2>
                        </div>
                        <hr />
                        <div className="status">
                            <div className="statusText">
                                <h3>Status:</h3>
                                <p className={workOrder.status === 'OPEN' ? 'open' : 'closed'}>{workOrder.status}</p>
                            </div>
                            <button onClick={handleChangeStatus}>Change Status</button>
                        </div>
                        <hr />
                        <div className="assignees">
                            <h3>Assignees:</h3>
                            <div className="assignee">
                                {workOrder.assignees
                                    ? workOrder.assignees.map((assignee: IUser) => (
                                          <p className="tooltip" key={assignee.id}>
                                              {assignee.name}
                                              <span className="tooltipText">{assignee.email}</span>
                                          </p>
                                      ))
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    return <div>{workOrder ? renderWorkOrder() : <AlertMessage errorMsg={errorMsg} />}</div>;
};
export default WorkOrder;
