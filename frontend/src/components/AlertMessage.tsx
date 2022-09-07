import { FunctionComponent } from 'react';

/** MUI Components */
import Alert from '@mui/material/Alert';

interface AlertProps {
    errorMsg: string;
}

const AlertMessage: FunctionComponent<AlertProps> = ({ errorMsg }) => {
    return (
        <Alert severity="info" sx={{ margin: 'auto' }}>
            {errorMsg}
        </Alert>
    );
};

export default AlertMessage;
