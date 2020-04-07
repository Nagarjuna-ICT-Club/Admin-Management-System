import React, { Component } from "react";
// componentns
import "../components/styles/ListUser.css";
import StatusCard from "../components/StatusCard";
import SearchForm from "../components/SearchForm";
import UserFilterer from "../components/UserFilterer";
import UserCardLists from "../components/UserCardLists";

//packages
import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

export default class ListUser extends Component {
  componentDidMount() {
    const data = localStorage.getItem("access-token");
    const decoded = jwtDecode(data);

    axios
      .get("http://localhost:8080/api/admin/accounts/get-student", {
        headers: { _id: decoded._id, Authorization: data },
      })
      .then((res) => {
        this.setState({
          userData: res.data,
        });
      })
      .catch((err) => {
        if (err && err.response && err.response.status)
          toast.error(err.response.data.msg);
      });

    axios
      .get("http://localhost:8080/api/admin/accounts/get-admin", {
        headers: { _id: decoded._id, Authorization: data },
      })
      .then((res) => {
        res.data.adminDetails.map(data => {
          return this.setState({
            userData: {
              adminDetails: this.state.userData.adminDetails.push(data)
            }
          })
        })
      })
      .catch((err) => {
        if (err && err.response && err.response.status)
          toast.error(err.response.data.msg);
      });
  }
  constructor(props) {
    super(props);

    this.state = {
      userType: "",
      userData: {
        admin: [],
        adminDetails: [],
        studentDetails: [],
      },
    };
  }
  getAllUser = (userType, ...restData) => {
    this.setState({
      userType,
    });
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
                users={this.state.userData}
                userType={this.state.userType}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
