import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App.tsx';
import './style/style.scss';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    ,
  </React.StrictMode>,
);
