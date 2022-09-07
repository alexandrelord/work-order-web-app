import { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';

/** MUI Components */
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface WorkOrderProps {
    workorders: any[];
}

const WorkOrdersTable: FunctionComponent<WorkOrderProps> = ({ workorders }) => {
    const [rowId, setRowId] = useState<number>(0);
    let columns: GridColDef[] = [];
    let rows: any[] = [];

    columns = [
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'status', headerName: 'Status', width: 150 }
    ];

    workorders.forEach((workorder: any) => {
        rows.push({
            id: workorder.id,
            name: workorder.name,
            status: workorder.status
        });
    });

    const handleRowClick = (row: any) => {
        setRowId(row.id);
    };

    return (
        <Container maxWidth="sm">
            <Box mt={10} style={{ height: 400, width: '100%' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {' '}
                    Work Orders{' '}
                </Typography>
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} onRowClick={handleRowClick} />
                <Button type="submit" variant="contained" component={Link} to={`workorders/${rowId}`} sx={{ mt: 5, mr: 5 }}>
                    {' '}
                    Go To Work Order
                </Button>
            </Box>
        </Container>
    );
};

export default WorkOrdersTable;

<Button component={Link} to="/" color="inherit">
                        Home
                    </Button>
