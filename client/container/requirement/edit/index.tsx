import React, { useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { List, IList } from '@rootDir/model/requirement';
import apiClient from '../../apiClient';
import { message } from 'antd';
import RequirementFrom from '../component/form';

export default function EditRequirenment({
  history,
  match,
}: Pick<RouteComponentProps<{requireId: string}>, 'history' | 'match'>) {
  const { requireId } = match.params;
  const [requirement, setRequirement] = useState(null as any as List);

  const fetchRequireData = useCallback(() => apiClient.get<IList>(`requirement/${requireId}/requirements`)
    .then((result: IList) => {
      setRequirement(result.data);
    }).catch(() => {
      message.error('拉取失败');
    }), [requireId]);

  useEffect(() => {
    if (requireId) {
      fetchRequireData();
    }
  }, [fetchRequireData, requireId]);

  return <RequirementFrom history={history} requirement={requirement} requireId={requireId} />;
}
