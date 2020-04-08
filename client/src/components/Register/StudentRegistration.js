import React, { Component } from "react";

// packages
import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

export default class RegisterForm extends Component {
  componentDidMount() {
    const data = localStorage.getItem("access-token");
    const decoded = jwtDecode(data);

    axios
      .get("http://localhost:8080/api/admin/semester/get-first-semester", {
        headers: { _id: decoded._id, Authorization: data },
      })
      .catch((err) => {
        if (err && err.response && err.response.status)
          toast.error(err.response.data.msg);
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      full_names: "",
      year: "",
      program: "csit",
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  register = (e) => {
    e.preventDefault();
    let semester_id;

    switch (this.state.program) {
      case 'csit':
        semester_id = "5e8d43277cb3db2187337205";
        break;
      case 'bim':
        semester_id = "5e8d43317cb3db218733720d";
        break;
      case 'bca':
        semester_id = "5e8d43397cb3db2187337215";
        break;
      case 'bbm':
        semester_id = "5e8d43427cb3db218733721d";
        break;
      case 'bbs':
        semester_id = "5e8d43497cb3db2187337225";
        break;
      default:
        semester_id = null;
    }

    const { full_names, year } = this.state;

    const student_names = full_names.split(",");

    const data = localStorage.getItem("access-token");
    const decoded = jwtDecode(data);
    axios
      .post(
        "http://localhost:8080/api/admin/accounts/new-student",
        {
          full_names: student_names,
          year,
          semester_id,
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
              name="full_names"
              onChange={this.handleInputChange}
            />
            <small className="form-text text-muted">
              Separate student name by ","(Comma)
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Year</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="year"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Semester</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value="First"
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Program</label>
            <select
              className="form-control"
              name="program"
              onChange={this.handleInputChange}
            >
              <option selected value="csit">
                Bsc.CSIT
              </option>
              <option value="bit">BIT</option>
              <option value="bca">BCA</option>
              <option value="bim">BIM</option>
              <option value="bbs">BBS</option>
            </select>
          </div>

          <button type="submit" className="btn" onClick={this.register}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
