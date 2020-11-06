import { Card } from 'antd';
import React from 'react';
import './index.scss';

interface IProps {
  children: JSX.Element;
  header: JSX.Element;
}

function CardLayout({ header, children }: IProps) {

  return (
    <div className='card_layout'>
      {header}
      <div className='card_layout__content'>
        <Card>{children}</Card>
      </div>
    </div>
  );
}

export default CardLayout;
