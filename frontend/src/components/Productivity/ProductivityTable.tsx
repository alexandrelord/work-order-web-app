import { FunctionComponent } from 'react';

/** MUI Components */
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

/** Types */
import { IUser } from '../../types';

interface ProductivityProps {
    productivity: IUser[];
}

const ProductivityTable: FunctionComponent<ProductivityProps> = ({ productivity }) => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 75 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 }
    ];
    const rows: IUser[] = [];

    productivity.forEach((prod: IUser) => {
        rows.push({
            id: prod.id,
            name: prod.name,
            email: prod.email
        });
    });

    return (
        <Container maxWidth="sm">
            <Box mt={10} style={{ height: 400, width: '100%' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {' '}
                    Workers not on any Assignements{' '}
                </Typography>
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
            </Box>
        </Container>
    );
};

export default ProductivityTable;
