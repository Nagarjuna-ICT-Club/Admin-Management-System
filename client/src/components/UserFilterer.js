import React, { Component } from 'react'

export default class UserFilterer extends Component {
    render() {
        return (
            <div>
                <select className="userType">
                <option selected disabled>Select User</option>
                  <option value="volvo">Students </option>
                  <option value="saab">Teacher</option>
                  <option value="opel">Admins</option>
                </select>
                <hr />
                <ul className="sortBy">
                  <li>
                    <select className="userType">
                      <option selected disabled>Program* </option>
                      <option value="saab">BSc.CSIT</option>
                      <option value="opel">BIT</option>
                    </select>
                  </li>

                  <li>
                    <select className="userType">
                      <option selected disabled>Semester* </option>
                      <option value="saab">BSc.CSIT</option>
                      <option value="opel">BIT</option>
                    </select>
                  </li>

                  <li>
                    <select className="userType">
                      <option selected disabled>Group </option>
                      <option value="saab">BSc.CSIT</option>
                      <option value="opel">BIT</option>
                    </select>
                  </li>

                  <li>
                    <select className="userType">
                      <option selected disabled>Reported </option>
                      <option value="saab">BSc.CSIT</option>
                      <option value="opel">BIT</option>
                    </select>
                  </li>

                  <li>
                    <select className="userType">
                      <option selected disabled>Blacklisted</option>
                      <option value="saab">BSc.CSIT</option>
                      <option value="opel">BIT</option>
                    </select>
                  </li>
                </ul>
            </div>
        )
    }
}
