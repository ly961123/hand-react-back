import React from 'react';
import { render } from 'react-dom';
// import '@tencent/tea-style/css/tea.css';
// import globalProcess from './globalProcess';
// import './main.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';
import MyRoute from './route';
import './assets/base.scss';
import 'babel-polyfill';

// globalProcess();

render(
  <ConfigProvider locale={zhCN}>
    <MyRoute />
  </ConfigProvider>,
  document.getElementById('root')
);
