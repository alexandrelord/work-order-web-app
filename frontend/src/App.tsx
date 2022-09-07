import { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

/** Custom Components */
import Home from './components/Home';
import WorkOrders from './components/WorkOrders/WorkOrders';
import WorkOrder from './components/WorkOrders/WorkOrder/WorkOrder';
import CreateWorkOrder from './components/WorkOrders/CreateWorkOrder';
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
