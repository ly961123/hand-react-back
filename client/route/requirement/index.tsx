import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import RequirementList from '../../container/requirement/list';
import Detail from '../../container/requirement/detail';

export default ({ match }: RouteComponentProps) => (
  <Switch>
    <Route exact path={`${match.url}`} component={RequirementList} />
    <Route path={`${match.url}/:requireId`} component={Detail} />
    <Redirect from='*' to={match.url} />
  </Switch>
);
