import React, { Component } from "react";

// packages
import axios from "axios";
import { toast } from "react-toastify";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      year: "",
      semester_id: "",//here the first sem id must be hardly coded 
      program_id: ""
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
          <div class="form-group">
            <label htmlFor="exampleInputPassword1">Full Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              name="full_name"
            />
            <small class="form-text text-muted">Separate student name by ","(Comma)</small>
          </div>
          <div class="form-group">
            <label htmlFor="exampleInputPassword1">Year</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              name="full_name"
            />
          </div>
          <div class="form-group">
            <label htmlFor="exampleInputPassword1">Semester</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              name="full_name"
              value="First"
              disabled
            />
          </div>
          <div class="form-group">
            <label htmlFor="exampleInputPassword1">Program</label>
            <select class="form-control" name="program" >
            <option selected value="csit">Bsc.CSIT</option>
            <option value="bit">BIT</option>
            <option value="BCA">BCA</option>
            <option value="BIM">BIM</option>
          </select>
          </div>
          
          <button type="submit" class="btn">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
