import React, {
  memo,
} from 'react';
import { Button } from 'antd';

interface IProp {
  goDetail: (value: number) => void;
}

const List = memo(({
  goDetail
}: IProp) => {
  return (
    <div>
      <Button
        type='primary'
        onClick={() => goDetail(111)}
      >
        List
      </Button>
    </div>
  )
})

export default List;