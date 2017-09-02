import React from 'react';
import { render } from 'react-dom'
import './semantic/dist/semantic.min.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))

// registerServiceWorker();
