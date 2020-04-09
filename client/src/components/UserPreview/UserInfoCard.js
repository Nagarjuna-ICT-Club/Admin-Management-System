import React, { Component } from "react";

import {Link} from "react-router-dom"

export default class UserInfoCard extends Component {
  render() {
    return (
      <div className="userInfoCard" style={{width:"100%"}}>
        <table style={{marginBottom: "15px"}}>
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
                  {/* {data.full_name.split("")[0]} */}
                  S
                </div>
              </td>
              <td>
              {/* {data.full_name} */}Sangya Sherpa
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
        <hr/>
        <div className="personalInfo">
            <table>
                <tbody>
                    <tr>
                        <td className="email">Email</td>
                        <td>sangyasherpa2058</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>9860379681</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>Boudha, Ramhiti</td>
                    </tr>
                    <tr>
                        <td>Parent No.</td>
                        <td>9818439173</td>
                    </tr>
                    <tr>
                        <td>Semester</td>
                        <td>first</td>
                    </tr>
                </tbody>
            </table>

            <ul>
                <li>
                    <Link className="action-button" to="/">Edit</Link>
                </li>
                <li>
                    <Link className="action-button" to="/">Delete</Link>
                </li>
            </ul>
        </div>
      </div>
    );
  }
}
