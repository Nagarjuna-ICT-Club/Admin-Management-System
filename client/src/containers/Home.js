import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../components/styles/Home.css";
export default class Home extends Component {
  logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  render() {
    return (
      <div className="home">
        <div className="container">
          Welcome to home!<br/>
          <button
            onClick={() => {
              this.logout();
            }}
          >
            logout
          </button><br/>
          <Link to="/admin/user-list">UserList</Link><br/>
          <Link to="/admin/register-admin">Register admin</Link>
        </div>
      </div>
    );
  }
}
