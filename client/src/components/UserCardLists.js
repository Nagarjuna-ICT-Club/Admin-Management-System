import React, { Component } from "react";
import {Link} from "react-router-dom"

export default class UserCardLists extends Component {
  render() {
    let listsOfUsers;
    
      listsOfUsers  = this.props.users.map((data, index) => {
        return (
          <li className="userCard" key={index}>
            <table>
              <tbody>
                <tr>
                  <td rowSpan="2">
                    <div className="userFirstNameCharacter" style={{
                      background: "#74b9ff",
                      color: "#fff",
                      fontSize: "22px",
                      padding: "10px 18px",
                      marginRight: "10px",
                      borderRadius: "50%"
                    }}>{data.full_name.split('')[0]}</div>
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

    return (
      <div>
        <ul>{listsOfUsers}</ul>
      </div>
    );
  }
}
