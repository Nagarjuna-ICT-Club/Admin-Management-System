import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// bootstrap
import "jquery/dist/jquery.slim";
import "popper.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

// fontawesome package
import "@fortawesome/fontawesome-free/css/all.css";
import "react-toastify/dist/ReactToastify.min.css";

// containers
import Login from "./containers/Login";
import Register from "./containers/Register";
import Home from "./containers/Home";

import isAuthenticated from "./helpers/isAuthenticated";

function PrivateRoute({ component: Component, path, ...rest }) {
  return (
    <Route
      path={path}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: isAuthenticated(),
    };
  }

  login = (token) => {
    localStorage.setItem("access-token", token);
    this.setState({
      isAuthenticated: true,
    });
  };

  logout = () => {
    localStorage.removeItem("access-token");

    this.setState({isAuthenticated: false})
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              this.state.isAuthenticated ? (
                <Redirect to="/home" userID={this.state.userID} />
              ) : (
                <Login login={this.login} />
              )
            }
          />
          <PrivateRoute path="/register-admin"
          component={Register}/>
          <PrivateRoute
            path="/home"
            component={Home}
            logout={this.logout}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
