import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { RootCmp } from './root-cmp';
import '../src/assets/styles/main.scss';
import { BrowserRouter as Router } from 'react-router-dom'
<<<<<<< HEAD
import { store } from './store/store'
import { Provider } from 'react-redux'
=======
import { Provider } from 'react-redux';
import {store} from './store/store';
>>>>>>> 71891b9dc46f41d09356081ebd2bf826c4572888

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RootCmp />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
