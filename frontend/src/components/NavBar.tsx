import { Link } from 'react-router-dom';

/** MUI Components */
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MaintainX
                    </Typography>
                    <Button component={Link} to="/" color="inherit">
                        Home
                    </Button>
                    <Button component={Link} to="/workorders" color="inherit">
                        WorkOrders
                    </Button>
                    <Button component={Link} to="/productivity" color="inherit">
                        Productivity
                    </Button>
                    <Button component={Link} to="/workorder/new" color="inherit">
                        Create WorkOrder
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
