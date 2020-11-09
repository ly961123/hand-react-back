import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../container/merchant'

export default ({ match }: RouteComponentProps) => (
  <Switch>
    <Route exact path={match.url} component={Home} />
    {/* <Route path={`${match.url}/create`} component={CreateMerchant} /> */}
    <Redirect from='*' to={match.url} />
  </Switch>
);
