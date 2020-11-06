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
        <div className='card_layout__card'>
          <Card>{children}</Card>
        </div>
      </div>
    </div>
  );
}

export default CardLayout;
