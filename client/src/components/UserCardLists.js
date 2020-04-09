import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

export default class UserCardLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previewData: {
        loginCredentials: [],
        basicCredentials: [],
      },
    };
  }

  redirect = (full_name) => {
    let userCredentials;
    let userData;

    if (this.props.userType === "admin") {
      userCredentials = this.props.users.adminDetails.filter(
        (data) => data.full_name === full_name
      );
      userData = this.props.users.admins.filter(
        (data) => data._id === userCredentials[0]._id
      );
    }

    if (this.props.userType === "student") {
      userCredentials = this.props.users.studentDetails.filter(
        (data) => data.full_name === full_name
      );
      userData = this.props.users.students.filter(
        (data) => data._id === userCredentials[0]._id
      );
    }

    if (this.props.userType === "teacher") {
      userCredentials = this.props.users.teacherDetails.filter(
        (data) => data.full_name === full_name
      );
      userData = this.props.users.teachers.filter(
        (data) => data._id === userCredentials[0]._id
      );
    }

    this.setState({
      previewData: {
        loginCredentials: userData,
        basicCredentials: userCredentials,
      },
    });
  };
  render() {
    let listsOfUsers;

    if (this.props.userType === "admin") {
      listsOfUsers = this.props.users.adminDetails.map((data, index) => {
        return (
          <li className="userCard" key={index}>
            <table>
              <tbody>
                <tr>
                  <td rowSpan="2">
                    <div
                      className="userFirstNameCharacter"
                      style={{
                        background: "#74b9ff",
                        color: "#fff",
                        fontSize: "22px",
                        padding: "10px 18px",
                        marginRight: "10px",
                        borderRadius: "50%",
                      }}
                    >
                      {data.full_name.split("")[0]}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        this.redirect(data.full_name);
                      }}
                    >
                      {data.full_name}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/" style={{ color: "##74b9ff" }}>
                      Send Message
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        );
      });
    }

    if (this.props.userType === "student") {
      listsOfUsers = this.props.users.studentDetails.map((data, index) => {
        return (
          <li className="userCard" key={index}>
            <table>
              <tbody>
                <tr>
                  <td rowSpan="2">
                    <div
                      className="userFirstNameCharacter"
                      style={{
                        background: "#74b9ff",
                        color: "#fff",
                        fontSize: "22px",
                        padding: "10px 18px",
                        marginRight: "10px",
                        borderRadius: "50%",
                      }}
                    >
                      {data.full_name.split("")[0]}
                    </div>
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname: "/admin/student-preview",
                        state: {
                          previewData: this.state.previewData
                        }
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        this.redirect(data.full_name);
                      }}
                    >
                      {data.full_name}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="" style={{ color: "##74b9ff" }}>
                      Send Message
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        );
      });
    }

    if (this.props.userType === "teacher") {
      listsOfUsers = this.props.users.teacherDetails.map((data, index) => {
        return (
          <li className="userCard" key={index}>
            <table>
              <tbody>
                <tr>
                  <td rowSpan="2">
                    <div
                      className="userFirstNameCharacter"
                      style={{
                        background: "#74b9ff",
                        color: "#fff",
                        fontSize: "22px",
                        padding: "10px 18px",
                        marginRight: "10px",
                        borderRadius: "50%",
                      }}
                    >
                      {data.full_name.split("")[0]}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        this.redirect(data.full_name);
                      }}
                    >
                      {data.full_name}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="" style={{ color: "##74b9ff" }}>
                      Send Message
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        );
      });
    }
    return (
      <div>
        <ul>{listsOfUsers}</ul>
      </div>
    );
  }
}
