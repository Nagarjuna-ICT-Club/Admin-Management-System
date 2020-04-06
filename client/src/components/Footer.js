import React, { Component } from "react";
import '../components/styles/Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
          <div className="container">
        <hr />
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            &copy; Nagarjuna College of IT. All Rights Reserved
          </div>
        </div>
      </div>
      </div>
    );
  }
}
