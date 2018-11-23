import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home';
import CarsItems from './components/carsItems';
import RegisterForm from './components/registerForm';
import InputForm from './components/inputForm';
import PageNotFound from './components/pageNotFound';
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className = "container">
      <Route path="/home" component={Home}></Route>
      <Route path="/carsItems" component={CarsItems}></Route>
      <Route path="/inputForm" component={InputForm}></Route>
      <Route path="/registerForm" component={RegisterForm}></Route>
      <Route path="/pageNotFound" component={PageNotFound}></Route>
      </div>
    );
  }
}

export default App; 