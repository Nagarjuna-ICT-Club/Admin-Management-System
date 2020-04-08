import React, { Component } from "react";

// packages
import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode"

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      year: "",
      contact_numbers: "",
      subject_names: "",
      program_names: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  register = (e) => {
    e.preventDefault();

    const {
      full_name,
      year,
      contact_numbers,
      subject_names,
      program_names,
    } = this.state;

    const contact_nums = contact_numbers.split(",");
    var contact_number = [];
    for (let num of contact_nums) contact_number.push(num.trim());

    const subjects = subject_names.split(",");
    var subject_name = [];
    for (let sub of subjects) subject_name.push(sub.trim());

    const programs = program_names.split(",");
    var program_name = [];
    for (let program of programs) program_name.push(program.trim());

    const data = localStorage.getItem("access-token");
    const decoded = jwtDecode(data);
    axios
      .post(
        "http://localhost:8080/api/admin/accounts/new-teacher",
        {
          full_name,
          year,
          program_name,
          subject_name,
          contact_number,
        },
        {
          headers: { _id: decoded._id, Authorization: data },
        }
      )
      .then((res) => {
        toast.success(res.data.msg);
      })
      .catch((err) => {
        if (err && err.response && err.response.status)
          toast.error(err.response.data.msg);
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
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Joined Year</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="year"
                onChange={this.handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="contact_numbers"
              onChange={this.handleInputChange}
            />
            <small className="form-text text-muted">
              Separate contact number by ","(Comma)
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Subject</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="subject_names"
              onChange={this.handleInputChange}
            />
            <small className="form-text text-muted">
              Separate subjects by ","(Comma)
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Program</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="program_names"
              onChange={this.handleInputChange}
            />
            <small className="form-text text-muted">
              Separate program by ","(Comma)
            </small>
          </div>

          <button type="submit" className="btn" onClick={this.register}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
