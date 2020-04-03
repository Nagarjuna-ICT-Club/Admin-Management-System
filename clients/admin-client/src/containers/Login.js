import React, { Component } from "react";

//components
import LoginForm from "../components/Login/LoginForm";

// custom sass
import "../components/Login/style.scss";

export default class Login extends Component {
  render() {
    return (
      <React.Fragment>
          <LoginForm/>
      </React.Fragment>
    );
  }
}
