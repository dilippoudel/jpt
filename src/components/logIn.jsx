import React from 'react';
import Joi from 'joi-browser';
import Form from './form';
class LogIn extends Form {
    state = {
        data:{username:'',password:''}, 
        errors: {}
    }
    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    }
    doSubmit = () => {
        //call the server
        console.log("Submitted")
    }
    render() {
        return (
            <div>
                <h1>Log in Form</h1>
                <form onSubmit = {this.handleSubmit}> 
                 {this.renderInput('username', 'Username')}
                 {this.renderInput('password', 'Password', "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LogIn;