import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Table.module.css';

/** MUI Components */
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

/** Types */
import { IWorkOrder } from '../../../../types';

interface WorkOrderProps {
    workorders: IWorkOrder[];
}

const WorkOrdersTable: FunctionComponent<WorkOrderProps> = ({ workorders }) => {
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', minWidth: 350 },
        { field: 'status', headerName: 'Status', minWidth: 225 }
    ];
    const rows: IWorkOrder[] = [];
    const history = useHistory();

    workorders.forEach((workorder: IWorkOrder) => {
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
