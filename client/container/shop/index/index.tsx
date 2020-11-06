import React, {
  memo,
  useEffect
} from 'react';
import { Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import List from './list';

const Shop = memo(({ match, history }: RouteComponentProps) => {
  useEffect(() => {
    console.log(window, '__GLOBAL__');
  }, []);

  const goDetail = (id: number) => {
    history.push(`${match.path}/${id}`)
  }

  return (
    <div>
      <Button
        type='primary'
      >shop</Button>
      <Button
        type='primary'
        onClick={() => goDetail(4944111)}
      >详情</Button>
      <List
        goDetail={goDetail}
      />
    </div>
  )
})

export default Shop;