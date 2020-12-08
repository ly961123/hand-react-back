import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import RequirementFrom from '../component/form';

export default function CreateRequirenment({
  history,
}: Pick<RouteComponentProps, 'history'>) {
  return <RequirementFrom history={history} />;
}
