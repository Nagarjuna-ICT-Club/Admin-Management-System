import React, { Component } from 'react'
import Icon from "../assets/404.png"

export default class PageNotFound extends Component {
    render() {
        return (
            <div style={{
                "background": "#fff"
            }}>
                <img src={Icon} alt="404 ot found!" style={{
                    "width": "60%",
                    "display": "block",
                    "margin": "0 auto",
                    "paddingBottom": "15%"
                }}/>
            </div>
        )
    }
}
