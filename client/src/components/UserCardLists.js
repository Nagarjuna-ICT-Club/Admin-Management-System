import React, { Component } from "react";
import {Link} from "react-router-dom"

// assets
import userIcon from "../assets/userIcon.png";

export default class UserCardLists extends Component {
  render() {
    let listsOfUsers;
    if(this.props.userType === "admin"){
      listsOfUsers  = this.props.users.adminDetails.map((data) => {
        return (
          <li className="userCard">
            <table>
              <tbody>
                <tr>
                  <td rowSpan="2">
                    <img src={userIcon} alt="profileImage" width="65px" />
                  </td>
                  <td>{data.full_name}</td>
                </tr>
                <tr>
                  <td>
                    <Link to="" style={{color: "##74b9ff"}}>Send Message</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        );
      });
    }
    if(this.props.userType === "student"){
      listsOfUsers  = this.props.users.studentDetails.map((data) => {
        return (
          <li className="userCard">
            <table>
              <tbody>
                <tr>
                  <td rowSpan="2">
                    <img src={userIcon} alt="profileImage" width="65px" />
                  </td>
                  <td>{data.full_name}</td>
                </tr>
                <tr>
                  <td>
                    <Link to="" style={{color: "##74b9ff"}}>Send Message</Link>
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
