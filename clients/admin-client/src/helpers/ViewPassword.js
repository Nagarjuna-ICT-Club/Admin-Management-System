import React, { Component } from "react";

export default class ViewPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secured: true
    };
  }
  changeEye = e => {
    e.preventDefault();

    if (this.state.secured) {
      this.setState({ secured: false });
    } else {
      this.setState({ secured: true });
    }
  };

  enterPressed = e => { 
    if(e.key === 'Enter'){
      this.props.login(e)
    }
  }
  render() {
    return (
      <div>
        <div className="password-container">
          <label htmlFor="password">
            <i className="fas fa-key"></i>
          </label>
          <input
            type={this.state.secured ? "password" : "text"}
            placeholder="Password"
            id="passwordInput"
            name="password"
            className="fields"
            onChange={this.props.handleChange}
            onKeyPress={this.enterPressed}
            required
          />
          <button onClick={this.changeEye}>
            <i
              id="eyeContainer"
              className={this.state.secured ? "fas fa-eye-slash" : "far fa-eye"}
            ></i>
          </button>
        </div>
      </div>
    );
  }
}
