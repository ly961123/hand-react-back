import React from 'react';
import './index.scss';
import {
  ArrowLeftOutlined
} from '@ant-design/icons';
import { RouteComponentProps } from 'react-router-dom';

type IHeader = {
  showBackButton?: boolean,
  title?: string,
  operation?: any,
} & Pick<RouteComponentProps, 'history'>

function CardLayout({
  history,
  showBackButton,
  title,
  operation,
} : IHeader) {

  return (
    <div className='card_layout__header'>
      <h1 className='card_layout__left'>
        {showBackButton && <ArrowLeftOutlined onClick={() => history.goBack()} className='card_layout__icon'/>}
        {title}
      </h1>
      {operation && <div className='card_layout__right'>{operation}</div>}
    </div>
  );
}

export default CardLayout;
