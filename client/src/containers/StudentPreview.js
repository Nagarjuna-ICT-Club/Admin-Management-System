import React, { Component } from 'react'

// components
import UserInfoCard from "../components/UserPreview/UserInfoCard"

// styling
import "../components/styles/UserInfoPreview.css"

export default class StudentPreview extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     userData: this.props.location.state.previewData
        // }
    }
    render() {
        // console.log(this.state.userData)
        return (
            <div id="studentPreview">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 userInfoCardLeft">
                            <UserInfoCard/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
