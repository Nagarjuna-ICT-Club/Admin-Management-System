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
          Welcome to home!
          <button
            onClick={() => {
              this.logout();
            }}
          >
            logout
          </button>
          <Link to="/admin/user-list">UserList</Link>
        </div>
      </div>
    );
  }
}
