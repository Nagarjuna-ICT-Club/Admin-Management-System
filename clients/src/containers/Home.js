import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div>
                Welcome to home!
                <button onClick={this.props.logout}>logout</button>
            </div>
        )
    }
}
