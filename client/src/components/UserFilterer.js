import React, { Component } from "react";

const buttonStyle = {
  width: "100%",
  padding: "5px 38%",
  textAlign: "center",
  background: "#74b9ff",
  color: "#fff",
};
export default class UserFilterer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: "",
      program: "",
      semester: "",
      group: "",
      reported: "",
      blacklisted: "",
    };
  }

  onFieldChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onFinalChange = (e) => {
    e.preventDefault();

    const {
      userType,
      program,
      semester,
      group,
      reported,
      blacklisted,
    } = this.state;
    this.props.getUsers(
      userType,
      program,
      semester,
      group,
      reported,
      blacklisted
    );
  };

  render() {
    return (
      <div>
        <select
          className="userType"
          name="userType"
          onChange={this.onFieldChange}
        >
          <option selected disabled>
            Select User
          </option>
          <option value="student">Students </option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admins</option>
        </select>
        <hr />
        <ul className="sortBy">
          <li>
            <select
              className="userType program"
              name="program"
              onChange={this.onFieldChange}
            >
              <option selected disabled>
                Program*{" "}
              </option>
              <option value="csit">BSc.CSIT</option>
              <option value="bit">BIT</option>
              <option value="bca">BCA</option>
              <option value="bim">BIM</option>
            </select>
          </li>

          <li>
            <select
              className="userType semester"
              name="semester"
              id="semester"
              onChange={this.onFieldChange}
            >
              <option selected disabled>
                Semester*{" "}
              </option>
              <option value="first">First</option>
              <option value="second">Second</option>
              <option value="third">Third</option>
              <option value="fourth">Fourth</option>
              <option value="fifth">Fifth</option>
              <option value="sixth">Sixth</option>
              <option value="seventh">Seventh</option>
              <option value="eighth">Eighth</option>
            </select>
          </li>

          <li>
            <select
              className="userType group"
              name="group"
              id="group"
              onChange={this.onFieldChange}
            >
              <option selected disabled>
                Group{" "}
              </option>
              <option value="first">First</option>
              <option value="second">Second</option>
              <option value="third">Third</option>
              <option value="fourth">Fourth</option>
              <option value="fifth">Fifth</option>
              <option value="sixth">Sixth</option>
              <option value="seventh">Seventh</option>
              <option value="eighth">Eighth</option>
            </select>
          </li>

          <li>
            <select
              className="userType reported"
              name="reported"
              onChange={this.onFieldChange}
            >
              <option selected disabled>
                Reported{" "}
              </option>
              <option value="true">true</option>
            </select>
          </li>

          <li>
            <select
              className="userType blacklisted"
              name="blacklisted"
              onChange={this.onFieldChange}
            >
              <option selected disabled>
                Blacklisted
              </option>
              <option value="true">true</option>
            </select>
          </li>
          <li>
            <button onClick={this.onFinalChange} className="searchByFilter" style={buttonStyle}>
              Search
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
