import { BrowserRouter, Route, Switch, Router  } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

import Login from './pages/Login';
import Register from './pages/Register';

const ProtectedRoute = ({}) => {
    
}

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/dashboard" component={Dashboard}/>
            </Switch>
        </BrowserRouter>
    );
}
