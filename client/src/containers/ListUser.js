import React, { Component } from "react";
// componentns
import "../components/styles/ListUser.css";
import StatusCard from "../components/StatusCard";
import SearchForm from "../components/SearchForm";
import UserFilterer from "../components/UserFilterer";
import UserCardLists from "../components/UserCardLists"

export default class ListUser extends Component {
  constructor(props){
    super(props);

    
    this.state = {
      name: '',
      userType: '',
      users: []
    }
  }

  getAllUser = (userType) => {
      if(userType === "admin") {

      }
      if(userType === "student") {
        
      }
      if(userType === "admin") {
        
      }
  }
  render() {
    return (
      <div className="userList">
        {/* <!-- status cards starts --> */}
        <StatusCard />
        {/* <!-- status card ends --> */}

        <div className="listOfUser container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12">
              {/* search user by name */}
              <SearchForm />
              {/* filter by groups */}
              <div className="filterGroup">
                <UserFilterer />
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 userCardLists">
              <UserCardLists/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
