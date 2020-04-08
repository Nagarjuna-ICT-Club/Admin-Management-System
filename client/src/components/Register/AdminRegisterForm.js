import React, { Component } from "react";

// packages
import axios from "axios";
import { toast } from "react-toastify";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      email: "",
      password: "",
      contact_number: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  register = (e) => {
    e.preventDefault();

    const { email, password, full_name, contact_number } = this.state;

    const token = localStorage.getItem("access-token");

    axios
      .post(
        "http://localhost:8080/api/admin/accounts/new-admin",
        {
          email,
          password,
          full_name,
          contact_number,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.msg);
      })
      .catch((err) => {
        if (err && err.response) toast.error(err.response.data.msg);
      });
  };
  render() {
    return (
      <div className="registerForm">
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="full_name"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={this.handleInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="contact_number"
              onChange={this.handleInputChange}
            />
          </div>

          <button type="submit" className="btn" onClick={this.register}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
