import React from 'react';
import { render } from 'react-dom';
// import '@tencent/tea-style/css/tea.css';
// import globalProcess from './globalProcess';
// import './main.css';
import 'antd/dist/antd.css';
import MyRoute from './route';
import './assets/base.scss';
import 'babel-polyfill';

// globalProcess();

render(<MyRoute />, document.getElementById('root'));
