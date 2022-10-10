import { useHistory } from 'react-router-dom';

import styles from './Table.module.css';

/** MUI Components */
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';

/** Types */
import { IWorkOrder } from '../../../../types';

// because props is the top-level object, we should use an interface or type to define the type of the props object
interface WorkOrderProps {
    workOrders: IWorkOrder[];
}

const WorkOrdersTable = ({ workOrders }: WorkOrderProps) => {
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', minWidth: 350 },
        { field: 'status', headerName: 'Status', minWidth: 225 }
    ];
    const rows: IWorkOrder[] = [];
    const history = useHistory();

    workOrders.forEach((workorder: IWorkOrder) => {
        rows.push({
            id: workorder.id,
            name: workorder.name,
            status: workorder.status
        });
    });

    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
        history.push(`/workorders/${params.row.id}`);
    };

    return (
        <section>
            <div className={styles.workorders}>
                <div className={styles.header}>
                    <p>List of Work Orders</p>
                </div>
                <div className={styles.tableContainer}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} onRowClick={handleRowClick} />
                </div>
            </div>
        </section>
    );
};

export default WorkOrdersTable;
