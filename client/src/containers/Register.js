import React, { Component } from "react";

// components
import AdminRegisterForm from "../components/Register/AdminRegisterForm";
import StudentRegisterFrom from "../components/Register/StudentRegistration"
import TeacherRegistration from "../components/Register/TeacherRegistration"

import "../components/Register/style.css";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "admin",
    };
  }

  onUserChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });

    console.log(this.state)
  }
  render() {
    return (
      <div className="registerForm">
        <div className="container">
          <h1>Registration</h1>
          <select class="form-control" name="user" onChange={this.onUserChange}>
            <option selected value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
          {/* mains starts */}
          {
            (this.state.user === "admin")?<AdminRegisterForm/>:this.state.user === "student"?<StudentRegisterFrom/>:<TeacherRegistration/>
          }
          {/* main ends */}
        </div>
      </div>
    );
  }
}
