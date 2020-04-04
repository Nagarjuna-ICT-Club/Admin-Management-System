import React, { Component } from "react";
import Logo from "../../assets/logo.png";

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

    axios
      .post("http://localhost:8080/api/admin/accounts/new-admin", {
        email,
        password,
        full_name,
        contact_number
      })
      .then((res) => {
        toast.success(res.data.msg)
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };
  render() {
    return (
      <main className="mx-auto">
        <img src={Logo} alt="Nagarjuna College of IT Logo" />
        <form>
          <input
            type="text"
            name="full_name"
            onChange={this.handleInputChange}
            placeholder="Full Name"
            className="fields"
            required
          />
          <br />
          <input
            type="text"
            name="email"
            onChange={this.handleInputChange}
            placeholder="Email"
            className="fields"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            onChange={this.handleInputChange}
            placeholder="Password"
            className="fields"
            required
          /><br/>
          <input
            type="text"
            name="contact_number"
            onChange={this.handleInputChange}
            placeholder="Contact Number"
            className="fields"
            required
          />
          <button type="submit" className="submit" onClick={this.register}>
            Register
          </button>
        </form>
      </main>
    );
  }
}
