import React, { Component } from "react";

export default class LoginForm extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="login_body">
          <nav class="navbar navbar-expand-lg navbar-light clr-white">
            <div class="container">
              <p>
                <i class="la la-arrow-left"></i> Back to page
              </p>
            </div>
          </nav>
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-sm-12 m-auto">
                <div class="login-box mt-5 mb-5">
                  <div class="col-md-8 col-sm-12 m-auto">
                    <div class="login-wrapper">
                      <div class="login-form">
                        <div class="col-6 m-auto text-center img-container">
                          <img src="assets/logo.png" alt="logo" />
                        </div>
                        <form method="POST" id="sms_login">
                          <div class="form-group row">
                            <label for="email" class="col-2 px-0 text-md-right">
                              <i class="la la-2x la-user"></i>
                            </label>
                            <div class="col-10">
                              <input
                                id="email"
                                type="email"
                                class="form-control login-input"
                                name="email"
                                value=""
                                required
                                autocomplete="email"
                                autofocus
                                placeholder="Username"
                              />
                              <span class="invalid-feedback" role="alert">
                                <strong class="error-email"></strong>
                              </span>
                            </div>
                          </div>
                          <div class="form-group row">
                            <label
                              for="password"
                              class="col-2 px-0 mx-0 text-md-right"
                            >
                              <i class="la la-2x la-key"></i>
                            </label>
                            <div class="col-10 d-flex">
                              <div class="w-100">
                                <input
                                  id="password"
                                  type="password"
                                  class="form-control login-input"
                                  name="password"
                                  required
                                  autocomplete="current-password"
                                  placeholder="Password"
                                />
                              </div>
                              <div class="eye">
                                <button
                                  class="btn sh"
                                  id="hide_show"
                                  data-ac="0"
                                >
                                  <i class="la la-2x la-eye"></i>
                                </button>
                              </div>
                              <span class="invalid-feedback" role="alert">
                                <strong class="error-password"></strong>
                              </span>
                            </div>
                            <a
                              href="{{ route('password.request') }}"
                              class="text-md-right offset-3"
                            >
                              Forgot Your Password?
                            </a>
                          </div>
                          <div class="form-group row mb-0">
                            <div class="col-md-10 offset-2">
                              <button
                                type="submit"
                                class="btn btn-primary btn-block mb-2"
                                id="sms_lg_sub"
                              >
                                Login
                              </button>
                            </div>
                            <div class="col-md-10 offset-2">
                              <button
                                type="button"
                                class="btn g-btn btn-block"
                                id="activate_profile"
                              >
                                Activate Your Account
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade bd-example-modal-lg"
          id="activate_modal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content g-modal">
              <div class="modal-header">Activate Your Account</div>
              <form method="post" id="profile_ac_form">
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-6 m-auto">
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control form-input"
                          name="email"
                          id="check_email"
                          value=" "
                          placeholder="Enter Email Provided"
                        />
                      </div>
                      <div class="form-group">
                        <button
                          type="button"
                          class="btn btn-secondary btn-sm "
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          class="btn btn-primary btn-sm g-btn"
                          id="act_btn"
                        >
                          Activate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
