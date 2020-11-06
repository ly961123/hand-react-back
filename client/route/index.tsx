import * as React from 'react';
import { withRouter } from 'react-router';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import App from '../container/application';
import MerchantRouter from './merchant';
import RequirementRouter from './requirement';
// import RequirementRouter from './requirement';
const WrapApp = withRouter(App);

export default function MyRoute() {
  return (
    <Router>
      <WrapApp>
        <Switch>
          {/* <Route path='/requirements' component={RequirementRouter} /> */}
          <Route path='/merchants' component={MerchantRouter} />
          <Route path='/requirements' component={RequirementRouter} />
          <Redirect from='*' to='/merchants' />
        </Switch>
      </WrapApp>
    </Router>
  );
}
