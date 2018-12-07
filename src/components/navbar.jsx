import React from 'react';
import {Link, NavLink} from 'react-router-dom';
const NavBar = () => {
    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">My-App</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
      <NavLink className="nav-item nav-link" exact to="/home">
        Home
        </NavLink>
        <NavLink className="nav-item nav-link " to="./carsItems">
        Cars
        </NavLink>
        <NavLink className="nav-item nav-link" to="./logIn">
        Log In 
        </NavLink>
        <NavLink className="nav-item nav-link" to="./registerForm">
        Register 
        </NavLink>
      </div>
    </div>
  </nav>
} 
export default NavBar;