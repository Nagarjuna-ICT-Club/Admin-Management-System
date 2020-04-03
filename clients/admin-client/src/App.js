import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// bootstrap
import "jquery/dist/jquery.slim";
import "popper.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

// fontawesome package
import "@fortawesome/fontawesome-free/css/all.css"

// containers
import Login from "./containers/Login";
import Register from "./containers/Register"

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/admin-register" component={Register}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
