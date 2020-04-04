import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

// packages
import axios from "axios";
import { toast } from 'react-toastify';

// helper
import ViewPassword from "../../helpers/ViewPassword";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = e => {
    e.preventDefault();

    const {email, password} = this.state;

    axios.post("http://localhost:8080/api/admin/authentication/auth-admin", {email, password}).then(res => {
      this.props.login(res.data.token);
    }).catch(err => {
      toast.error(err.response.data.msg)
    })
  }
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
            required
          />
          <br />
          <ViewPassword login={this.login} handleChange={this.handleInputChange} />
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
