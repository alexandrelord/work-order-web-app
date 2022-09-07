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

const CreateWorkOrder: FunctionComponent = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [assignees, setAssignees] = useState<any>([]);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                const response = await getUsers();
                setUsers(response.users);
                if (users.length === 0) {
                    setErrorMsg('No users found. Everyone was fired!');
                }
            } catch (error) {
                setErrorMsg('Something went wrong. Please try again later.');
            }
        })();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newWorkOrder = {
            workOrderName: name,
            assignees: assignees
        };

        try {
            const response = await createWorkOrder(newWorkOrder);

            if (response === 201) {
                setErrorMsg('');
                setName('');
                setAssignees([]);
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
                        <TextField variant="standard" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} autoFocus required />
                        <Box>
                            <Stack spacing={1}>
                                {users.map((user: any) => {
                                    const userId: any = user.id;
                                    return (
                                        <Chip
                                            key={user.id}
                                            label={user.name}
                                            color={assignees.includes(userId) ? 'success' : 'primary'}
                                            sx={{ textAlign: 'center' }}
                                            onClick={() => {
                                                if (assignees.length === 0) {
                                                    setAssignees([userId]);
                                                } else if (!assignees.includes(userId)) {
                                                    setAssignees((current: any) => [...current, userId]);
                                                } else {
                                                    setAssignees((current: any) => current.filter((id: any) => id !== userId));
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
