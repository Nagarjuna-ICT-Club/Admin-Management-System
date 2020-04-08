import React, { Component } from "react";

// packages
import axios from "axios"
import jwtDecode from "jwt-decode"
import {toast} from "react-toastify"

export default class StatusCard extends Component {
  componentDidMount(){
    const data = localStorage.getItem("access-token");
    const decoded = jwtDecode(data);
    axios
      .get(
        "http://localhost:8080/api/admin/accounts/get-user-number",
        {
          headers: { _id: decoded._id, Authorization: data },
        }
      )
      .then((res) => {
        const {admin, student, teacher} = res.data.countUser
        this.setState({
          admin,student,teacher
        })
      })
      .catch((err) => {
        if (err && err.response && err.response.status)
          toast.error(err.response.data.msg);
      });
  }
  constructor(props){
    super(props);

    this.state = {
      student: 0,
      teacher: 0,
      admin: 0
    }
  }
  render() {
    return (
      <div>
        <div className="statusCards container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex">
              <div className="info">
                <h1>{this.state.student}</h1>
                <span className="cardTitle">Students</span>
              </div>
              <div className="icon align-self-center">
                <i className="fas fa-user-graduate"></i>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex">
              <div className="info">
                <h1>{this.state.teacher}</h1>
                <span className="cardTitle">Teachers</span>
              </div>
              <div className="icon align-self-center">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex">
              <div className="info">
                <h1>{this.state.admin}</h1>
                <span className="cardTitle">Admins</span>
              </div>
              <div className="icon align-self-center">
                <i className="fas fa-user-secret"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
