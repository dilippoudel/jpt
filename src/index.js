import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from 'react-router-dom';
import App from './App';







ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root1'));

registerServiceWorker();
