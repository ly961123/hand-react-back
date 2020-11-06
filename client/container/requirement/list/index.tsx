import React, {
  memo,
  useEffect
} from 'react';
import { Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import CardLayout from '../../../component/layout/CardLayout';
import CardHeader from '../../../component/layout/CardHeader';

const Shop = memo(({ match, history }: RouteComponentProps) => {
  useEffect(() => {
    console.log(window, '__GLOBAL__');
  }, []);

  const goDetail = (id: number) => {
    history.push(`${match.path}/${id}`)
  }

  return (
    <CardLayout
      header={
        <CardHeader
          history={history}
          // showBackButton
          title='需求列表'
          operation={
            true
            && <Button
              type='primary'
              onClick={() => {
                // history.push(`${merchantsPath}/${query.merchantId}/create`);
              }}
            >
              新建需求
            </Button>
          }
        />
      }
    >
      <div>
        <Button
          type='primary'
        >shop</Button>
        <Button
          type='primary'
          onClick={() => goDetail(4944111)}
        >详情</Button>
      </div>
    </CardLayout>
  )
})

export default Shop;