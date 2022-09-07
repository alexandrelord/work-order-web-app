import { FunctionComponent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

/** Service Functions */
import { getWorkOrder, updateWorkOrder } from '../../api/workorders';

/** Custom Components */
import AlertMessage from '../AlertMessage';

/** MUI Components */
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

const WorkOrder: FunctionComponent = () => {
    const [workOrder, setWorkOrder] = useState<any>({});
    const [errorMsg, setErrorMsg] = useState<string>('');
    const params: any = useParams();
    const id: string = params.id;
    let assignees: any;

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const response = await getWorkOrder(id);
                setWorkOrder(response.workOrder);
            } catch (error) {
                setErrorMsg('Something went wrong. Please try again later.');
            }
            return () => {
                isMounted = false;
            };
        })();
    }, []);

    if (workOrder.assignees) {
        assignees = workOrder.assignees.map((assignee: any) => {
            return (
                <Tooltip key={assignee.id} title={<p style={{ fontSize: 15 }}> {assignee.email}</p>} placement="left">
                    <p>{assignee.name}</p>
                </Tooltip>
            );
        });
    }

    const handleChangeStatus = async () => {
        try {
            const response = await updateWorkOrder(id, workOrder.status === 'OPEN' ? 'CLOSED' : 'OPEN');
            // reponse.response???
            setWorkOrder({ ...workOrder, status: response.response[0].status });
        } catch (error) {
            setErrorMsg('Something went wrong. Please try again later.');
        }
    };

    const renderWorkOrder = () => {
        return (
        <Container maxWidth="sm">
            <Box mt={10} style={{ height: 400, width: '100%' }}>
                <Stack spacing={2}>
                    <Typography variant="h4" component="h1">
                        {workOrder.name}
                    </Typography>
                    <Typography variant="h4" component="h4">
                        Status: {workOrder.status}
                        <Button variant="contained" sx={{ ml: 5 }} onClick={handleChangeStatus}>
                            Change Status
                        </Button>
                    </Typography>
                    <Typography variant="h4" component="h4">
                        Assignees
                    </Typography>

                    <Typography variant="h6">{assignees}</Typography>
                </Stack>
            </Box>
        </Container>
        )
    }

    return (
        <div>{workOrder ? renderWorkOrder() : <AlertMessage errorMsg={errorMsg} />}</div>
    );
};
export default WorkOrder;
