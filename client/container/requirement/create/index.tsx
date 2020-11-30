import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import RequirementFrom from '../component/form';

export default function CreateMerchant({
  history,
}: Pick<RouteComponentProps, 'history'>) {
  return <RequirementFrom history={history} />;
}
