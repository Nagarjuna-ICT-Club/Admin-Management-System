import React, { Component } from "react";

export default class StatusCard extends Component {
  render() {
    return (
      <div>
        <div className="statusCards container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex">
              <div className="info">
                <h1>999</h1>
                <span className="cardTitle">Students</span>
              </div>
              <div className="icon align-self-center">
                <i class="fas fa-user-graduate"></i>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex">
              <div className="info">
                <h1>88</h1>
                <span className="cardTitle">Teachers</span>
              </div>
              <div className="icon align-self-center">
                <i class="fas fa-chalkboard-teacher"></i>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex">
              <div className="info">
                <h1>999</h1>
                <span className="cardTitle">Admins</span>
              </div>
              <div className="icon align-self-center">
                <i class="fas fa-user-secret"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
