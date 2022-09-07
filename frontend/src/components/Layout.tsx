import { FunctionComponent } from 'react';
import NavBar from './NavBar';

const Layout: FunctionComponent = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
};

export default Layout;
