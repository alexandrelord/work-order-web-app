import { FunctionComponent } from 'react';
import NavBar from './NavBar';

const Layout: FunctionComponent = ({ children }) => {
    return (
        <>
            <NavBar />
            <main>{children}</main>
        </>
    );
};

export default Layout;
