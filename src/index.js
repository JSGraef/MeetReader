import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Providers = () => {
  return ( 
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  )
}

ReactDOM.render(
  <Providers />,
  document.getElementById('root')
);
