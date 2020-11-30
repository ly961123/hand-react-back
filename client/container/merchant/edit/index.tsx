import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Spins from '@rootDir/client/component/Spins';
import { IMerchantData, List } from '@rootDir/model/merchant';
import apiClient from '../../apiClient';
import MerchantFrom from '../component/form';

export default function EditMerchant({
  history,
  match,
}: Pick<RouteComponentProps<{merchantId: string}>, 'history'| 'match'>) {
  const { merchantId } = match.params;
  const [tempMerchant, setTempMerchant] = useState<List>();
  const [loading, setLoading] = useState(false);

  const fetchMerchantRequest = async (merchantId: string) => {
    const result: IMerchantData = await apiClient.get(`merchant/${merchantId}`);
    return result;
  };

  useEffect(() => {
    if (merchantId) {
      setLoading(true);
      fetchMerchantRequest(merchantId).then(resp => {
        setTempMerchant(resp.data);
        setLoading(false);
      });
    }
  }, [merchantId]);

  return <Spins spinning={loading}>
    <MerchantFrom history={history} merchant={tempMerchant} />
  </Spins>;
}
