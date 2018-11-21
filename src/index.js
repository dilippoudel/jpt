import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
//import Carlist from './CarList/carList'
import Main from './App';


ReactDOM.render(<Main/>, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root1'));

registerServiceWorker();
