import { FunctionComponent } from 'react';

/**MUI Components */
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Home: FunctionComponent = () => {
    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h2">MaintainX Welcomes You to the Work Order Management System</Typography>
            </Box>
        </Container>
    );
};

export default Home;
