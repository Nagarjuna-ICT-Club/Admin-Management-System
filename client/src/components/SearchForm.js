import React, { Component } from "react";

export default class SearchForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      filterName: ""
    }
  }
  handleInputChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmitFilterName = (e) => {
    e.preventDefault();
    this.props.filterByName(this.state.filterName)
  }
  render() {
    return (
      <div>
        <form className="filterName">
          <input
            className="searchInput"
            type="text"
            name="filterName"
            placeholder="Search Name"
            onChange={this.handleInputChange}
            required
          />
          <br />
          <input type="submit" value="Search" className="submit" onClick={this.onSubmitFilterName}/>
        </form>
      </div>
    );
  }
}
