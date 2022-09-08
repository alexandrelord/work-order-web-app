import { FunctionComponent } from 'react';
import { Link, useHistory } from 'react-router-dom';

/** MUI Components */
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/** Types */
import { IWorkOrder } from '../../types';

interface WorkOrderProps {
    workorders: IWorkOrder[];
}

const WorkOrdersTable: FunctionComponent<WorkOrderProps> = ({ workorders }) => {
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'status', headerName: 'Status', width: 150 }
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
        <Container maxWidth="sm">
            <Box mt={10} style={{ height: 400, width: '100%' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {' '}
                    Work Orders{' '}
                </Typography>
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} onRowClick={handleRowClick} />
            </Box>
        </Container>
    );
};

export default WorkOrdersTable;

<Button component={Link} to="/" color="inherit">
    Home
</Button>;
