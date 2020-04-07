import React, { Component } from "react";

// componentns
import "../components/styles/ListUser.css";
import StatusCard from "../components/StatusCard";
import SearchForm from "../components/SearchForm";
import UserFilterer from "../components/UserFilterer";
import UserCardLists from "../components/UserCardLists";

// packages
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import Axios from "axios";

export default class ListUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: "",
      admin: [],
      adminDetails: [],
      studentDetails: [],
      teacherDetails: [],
    };
  }

  propChanger = () => {
    if (this.state.userType === "admin") return this.state.adminDetails;
    if (this.state.userType === "student") return this.state.studentDetails;
  };

  getAllUser = (userType, ...restData) => {
    this.setState({
      userType,
    });

    const data = localStorage.getItem("access-token");
    const decoded = jwtDecode(data);
    if (userType === "admin") {
      Axios.get("http://localhost:8080/api/admin/accounts/get-admin", {
        headers: { _id: decoded._id, Authorization: data },
      })
        .then((res) => {
          this.setState({
            adminDetails: res.data.adminDetails,
          });
        })
        .catch((err) => {
          if (err && err.response && err.response.status)
            toast.error(err.response.data.msg);
        });
    }

    if (userType === "student") {
      Axios.get("http://localhost:8080/api/admin/accounts/get-student", {
        headers: { _id: decoded._id, Authorization: data },
      })
        .then((res) => {
          this.setState({
            studentDetails: res.data.studentDetails,
          });
        })
        .catch((err) => {
          if (err && err.response && err.response.status)
            toast.error(err.response.data.msg);
        });
    }
  };
  render() {
    return (
      <div className="userList">
        {/* <!-- status cards starts --> */}
        <StatusCard />
        {/* <!-- status card ends --> */}

        <div className="listOfUser container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12">
              {/* search user by name */}
              <SearchForm />
              {/* filter by groups */}
              <div className="filterGroup">
                <UserFilterer getUsers={this.getAllUser} />
              </div>
            </div>

            <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 userCardLists">
              <UserCardLists
                users={
                  this.state.userType === "admin"
                    ? this.state.adminDetails
                    : this.state.userType === "student"
                    ? this.state.studentDetails
                    : this.state.teacherDetails
                }
                userType={this.state.userType}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
