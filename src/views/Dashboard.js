import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let data_login = localStorage.getItem('login_status')
    if (!data_login) {
      window.location.replace('/')
    }
  }

  render() {
    return (
      (
        <div className="app-content content">
          <div className="content-wrapper">
          </div>
        </div>
      )
    )
  }
}

export default Dashboard;