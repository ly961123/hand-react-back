import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import Merchant from '../../container/merchant/list';
import Create from '../../container/merchant/create';
import Edit from '../../container/merchant/edit';

export default ({ match }: RouteComponentProps) => (
  <Switch>
    <Route exact path={match.url} component={Merchant} />
    <Route path={`${match.url}/create`} component={Create} />
    <Route path={`${match.url}/:merchantId/edit`} component={Edit} />
    <Redirect from='*' to={match.url} />
  </Switch>
);
