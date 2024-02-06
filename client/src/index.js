import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import 'resources/styles/styles.css' 
import { Provider } from 'react-redux';
import ReduxStore from 'store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={ReduxStore()}>
    <Routes />
    </Provider>
  </React.StrictMode>
);
