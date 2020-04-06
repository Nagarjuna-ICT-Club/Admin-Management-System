import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import ListUser from "./ListUser";
import Register from "./Register";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default class PrivateRoutes extends Component {
  componentDidMount() {
    const data = localStorage.getItem("userData");
    this.setState({
      userData: JSON.parse(data),
    });
  }
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
    };
  }
  render() {
    return (
      <BrowserRouter>
        <Navbar userName={this.state.userData.full_name} />
        <Sidebar userName={this.state.userData.full_name}/>
        <Switch>
          <Route exact path="/admin" component={Home} />
          <Route path="/admin/user-list" component={ListUser} />
          <Route path="/admin/register-admin" component={Register} />
        </Switch>
        <Footer/>
      </BrowserRouter>
    );
  }
}
