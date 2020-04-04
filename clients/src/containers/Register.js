import React, { Component } from "react";
import {Link} from 'react-router-dom'

// package*s
import { ToastContainer } from "react-toastify";

// components
import RegisterForm from "../components/Register/RegisterForm"

import "../components/Register/style.css";

export default class Register extends Component {
  render() {
    return (
      <div className="container">
      <ToastContainer/>
        {/* <!-- header starts --> */}
        <header>
          <Link to="/" className="backPage">
            <i className="fas fa-arrow-left"></i> Back to page
          </Link>
        </header>
        {/* <!-- header ends --> */}

        {/* mains starts */}
        <RegisterForm/>
        {/* main ends */}

        {/* footer starts */}
        <footer>
        <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                &copy; Nagarjuna College of IT. All Rights Reserved
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-xl-right text-lg-right text-md-right">
                <ul>
                    <li><Link to="">About</Link></li>
                    <li><Link to="">Contact</Link></li>
                </ul>
            </div>
        </div>
    </footer>
        {/* footer ends */}
      </div>
    );
  }
}
