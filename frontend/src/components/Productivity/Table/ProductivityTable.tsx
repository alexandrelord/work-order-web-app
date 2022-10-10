/** CSS Module */
import styles from './ProductivityTable.module.css';

/** MUI Components */
import { DataGrid, GridColDef } from '@mui/x-data-grid';

/** Types */
import { IUser } from '../../../types';

interface IProductivityTableProps {
    users: IUser[];
}

const ProductivityTable = ({ users }: IProductivityTableProps) => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 75 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 }
    ];
    const rows: IUser[] = [];

    users.forEach((prod: IUser) => {
        rows.push({
            id: prod.id,
            name: prod.name,
            email: prod.email
        });
    });

    return (
        <section>
            <div className={styles.workorders}>
                <div className={styles.header}>
                    <p>Assignees w/o a Work Order</p>
                </div>
                <div className={styles.tableContainer}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
                </div>
            </div>
        </section>
    );
};

export default ProductivityTable;
