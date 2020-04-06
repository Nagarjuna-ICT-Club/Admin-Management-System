import React, { Component } from 'react'

export default class SearchForm extends Component {
    render() {
        return (
            <div>
                <form className="filterName">
                <input
                  className="searchInput"
                  type="text"
                  name="filterName"
                  placeholder="Search Name"
                />
                <br />
                <input type="submit" value="Search" className="submit"/>
              </form>
            </div>
        )
    }
}
