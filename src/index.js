import React from 'react';
import ReactDOM from 'react-dom';
import AuthHome from './components/AuthHome';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <AuthHome />
  </Router>,
  document.getElementById('root')
);
