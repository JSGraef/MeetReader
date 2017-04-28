import React from 'react';
import ReactDOM from 'react-dom';
import AuthHome from './components/AuthHome';
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <Router>
      <AuthHome />
    </Router>
  </LocaleProvider>,
  document.getElementById('root')
);
