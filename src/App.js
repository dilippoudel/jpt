import React, {Component} from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';
import Home from './components/home';
import CarsItems from './components/carsItems';
import RegisterForm from './components/registerForm';
import PageNotFound from './components/pageNotFound';
import NavBar from './components/navbar';
import LogIn from './components/logIn';
import CarForm from './components/carform';
import "./App.css";
class App extends Component {
  render() {
    return (
      <React.Fragment>
      <NavBar/>
      <div className = "container">
      <Switch>
      <Route path="/carform/:_links.self.href" component={CarForm}></Route>
      <Route path="/home" component={Home}></Route>
      <Route path="/carsItems" component={CarsItems}></Route>
      <Route path="/logIn" component={LogIn}></Route>
      <Route path="/registerForm" component={RegisterForm}></Route>
      <Route path="/pageNotFound" component={PageNotFound}></Route>
      <Redirect from = "/" exact to = "/carsItems" />
      <Redirect to = "/pageNotFound" />
      </Switch>
      </div>
      </React.Fragment>
    );
  }
}

export default App; 