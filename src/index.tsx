import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './react/App';
import { Provider } from 'react-redux';
import store from './react/store';

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </Provider>,
    document.getElementById('root')
  );
}

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./react/App', render);
}