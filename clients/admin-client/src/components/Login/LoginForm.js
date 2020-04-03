import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

// helper
import ViewPassword from "../../helpers/ViewPassword";

import Login from "../../api/login";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  login = e => {
    e.preventDefault();
    
    let { email, password } = this.state;

    Login({ email, password });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <main className="mx-auto">
        <img src={Logo} alt="Nagarjuna College of IT Logo" />
        <form>
          <label htmlFor="email">
            <i className="far fa-user-circle"></i>
          </label>
          <input
            type="text"
            name="email"
            onChange={this.handleInputChange}
            placeholder="Email"
            className="fields"
          />
          <br />
          <ViewPassword handleChange={this.handleInputChange} />
          <Link to="" className=" forgot">
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="submit"
            onClick={this.login}
          >
            Login
          </button>
        </form>
      </main>
    );
  }
}
