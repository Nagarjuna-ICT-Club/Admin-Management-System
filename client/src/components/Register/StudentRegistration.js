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
      case "csit":
        semester_id = "5e8d6eff43723e5d271d2680";
        break;
      case "bit":
        semester_id = "5e8d6ef043723e5d271d2678";
        break;
      case "bim":
        semester_id = "5e8d6f0c43723e5d271d2688";
        break;
      case "bca":
        semester_id = "5e8d6f4243723e5d271d2690";
        break;
      case "bbm":
        semester_id = "5e8d6fe443723e5d271d26a0";
        break;
      case "bbs":
        semester_id = "5e8d6f4943723e5d271d2698";
        break;
      default:
        semester_id = null;
    }

    const { full_names, year, program } = this.state;

    const students = full_names.split(",");
    var student_names = [];
    for(let student of students){
      student_names.push(student.trim())
    }

    const data = localStorage.getItem("access-token");
    const decoded = jwtDecode(data);
    axios
      .post(
        "http://localhost:8080/api/admin/accounts/new-student",
        {
          full_names: student_names,
          year,
          semester_id,
          semester_name: "first",
          program_name: program
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
              required
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
              required
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
              required
            >
              <option selected value="csit">
                Bsc.CSIT
              </option>
              <option value="bit">BIT</option>
              <option value="bca">BCA</option>
              <option value="bim">BIM</option>
              <option value="bbs">BBS</option>
              <option value="bbm">BBM</option>
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
