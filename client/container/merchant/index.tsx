import React, {
  memo,
  useContext,
} from 'react';
import { GlobalState } from '../application';
import { Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import CardLayout from '../../component/layout/CardLayout';
import CardHeader from '../../component/layout/CardHeader';

const FillScheme = memo(({ history }: RouteComponentProps) => {
  const { hideMenu, setHideMenu } = useContext(GlobalState);
  return (
    <CardLayout
      header={
        <CardHeader
          history={history}
          // showBackButton
          title='商户列表'
          operation={
            true
            && <Button
              type='primary'
              onClick={() => {
                // history.push(`${merchantsPath}/${query.merchantId}/create`);
              }}
            >
              新建商户
            </Button>
          }
        />
      }
    >
      <div>
        <span>首页</span>
        {hideMenu && <span>是否显示</span>}
        <Button
          type='primary'
          onClick={() => {
            setHideMenu(!hideMenu);
          }}
        >改变</Button>
      </div>
    </CardLayout>
  )
})

export default FillScheme;