import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/** Service Functions */
import { api } from '../../../services/api';

/** CSS Module */
import styles from './CreateWorkOrder.module.css';

/** Custom Components */
import AlertMessage from '../../AlertMessage';

/** MUI Components */
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

/** Types */
import { IUser } from '../../../types';

/** Custom Hook */
import useFetch from '../../../hooks/useFetch';

const CreateWorkOrder = () => {
    const { data: users, errorMsg, setErrorMsg } = useFetch<IUser[]>('/api/users', 'GET');
    const [workOrderName, setWorkOrderName] = useState('');
    const [assigneesId, setAssigneesId] = useState<number[]>([]);

    const history = useHistory();

    useEffect(() => {
        setErrorMsg('');
    }, [workOrderName]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!workOrderName) {
            setErrorMsg('Please enter a work order name before submitting the form.');
            return;
        }

        try {
            const response = await api({ url: '/api/workorders/new', method: 'POST', data: { workOrderName, assigneesId } });
            if (response.status === 201) {
                history.push('/workorders');
            }
        } catch (error) {
            error instanceof Error && setErrorMsg(error.message);
        }
    };

    const renderAssignees = () => {
        return (
            <div className={styles.assignees}>
                <div className={styles.assigneesList}>
                    {users &&
                        users.map((user: IUser) => {
                            const userId: number = user.id;
                            return (
                                <Chip
                                    key={user.id}
                                    label={user.name}
                                    color={assigneesId.includes(userId) ? 'success' : 'primary'}
                                    sx={{ textAlign: 'center', margin: '0.5rem', fontSize: '1rem' }}
                                    size="medium"
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
                </div>
            </div>
        );
    };

    return (
        <section>
            <form className={styles.workorder} onSubmit={handleSubmit}>
                <div className={styles.header}>
                    <p>Create a New Work Order</p>
                </div>

                <div className={styles.body}>
                    <div className={styles.name}>
                        <h3>Name:</h3>
                        <input type="text" onChange={(e) => setWorkOrderName(e.target.value)} value={workOrderName} />
                    </div>

                    <hr />
                    <div className={styles.assignees}>
                        <h3>Assignees:</h3>
                        {renderAssignees()}
                    </div>
                    <hr />
                </div>
                <div className={styles.footer}>
                    <Button type="submit" variant="contained" size="large" color="warning">
                        Submit
                    </Button>
                </div>
            </form>
            {errorMsg && <AlertMessage errorMsg={errorMsg} />}
        </section>
    );
};

export default CreateWorkOrder;
