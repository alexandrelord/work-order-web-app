import { FunctionComponent, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/** Service Functions */
import { getUsers } from '../../api/users';
import { createWorkOrder } from '../../api/workorders';

/** MUI Components */
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

/** Types */
import { IUser, INewWorkOrder } from '../../types';

const CreateWorkOrder: FunctionComponent = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [workOrderName, setWorkOrderName] = useState<string>('');
    const [assigneesId, setAssigneesId] = useState<number[]>([]);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                const response = await getUsers();
                response.status === 200 && setUsers(response.users);
                response.status === 404 && setErrorMsg(response.message);
            } catch (error) {
                setErrorMsg('Something went wrong. Please try again later.');
            }
        })();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newWorkOrder: INewWorkOrder = {} as INewWorkOrder;

        if (!workOrderName) {
            setErrorMsg('Please enter a work order name.');
            return;
        } else if (assigneesId.length === 0) {
            newWorkOrder = {
                workOrderName
            };
        } else {
            newWorkOrder = {
                workOrderName,
                assigneesId
            };
        }

        try {
            const response = await createWorkOrder(newWorkOrder);

            if (response.status === 201) {
                setErrorMsg('');
                setWorkOrderName('');
                setAssigneesId([]);
                history.push('/workorders');
            }
        } catch (error) {
            setErrorMsg('Something went wrong. Please try again later.');
        }
    };

    return (
        <div>
            <Container maxWidth="sm">
                <Box sx={{ marginTop: '50px' }}>
                    <Stack component="form" sx={{ width: '320px', textAlign: 'center' }} spacing={2} autoComplete="off" onSubmit={handleSubmit}>
                        <Typography variant="h5">Create Work Order Form</Typography>
                        <TextField variant="standard" type="text" placeholder="Name" onChange={(e) => setWorkOrderName(e.target.value)} value={name} autoFocus required />
                        <Box>
                            <Stack spacing={1}>
                                {users.map((user: IUser) => {
                                    const userId: number = user.id;
                                    return (
                                        <Chip
                                            key={user.id}
                                            label={user.name}
                                            color={assigneesId.includes(userId) ? 'success' : 'primary'}
                                            sx={{ textAlign: 'center' }}
                                            onClick={() => {
                                                if (assigneesId.length === 0) {
                                                    setAssigneesId([userId]);
                                                } else if (!assigneesId.includes(userId)) {
                                                    setAssigneesId((current: number[]) => [...current, userId]);
                                                } else {
                                                    setAssigneesId((current: number[]) => current.filter((id: number) => id !== userId));
                                                }
                                            }}
                                        />
                                    );
                                })}
                                <Button type="submit" variant="contained" color="secondary">
                                    Create
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </div>
    );
};

export default CreateWorkOrder;
