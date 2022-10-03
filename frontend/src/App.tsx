import { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

/** Custom Components */
import Home from './components/Home/Home';
import WorkOrders from './components/WorkOrders/List/WorkOrders';
import WorkOrder from './components/WorkOrders/Details/WorkOrder';
import CreateWorkOrder from './components/WorkOrders/CreateForm/CreateWorkOrder';
import Productivity from './components/Productivity/Productivity';
import Layout from './components/Layout';

const App: FunctionComponent = () => {
    return (
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/workorders" component={WorkOrders} />
                <Route exact path="/workorder/new" component={CreateWorkOrder} />
                <Route exact path="/workorders/:id" component={WorkOrder} />
                <Route exact path="/productivity" component={Productivity} />
            </Switch>
        </Layout>
    );
};

export default App;
