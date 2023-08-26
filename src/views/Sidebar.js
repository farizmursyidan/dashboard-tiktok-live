import React, { Component } from "react";
import { Link } from "react-router-dom";
import routes from '../routes';
import { postDataToAPI } from "../helper/asyncFunction";

class Sidebar extends Component {

  logout = async () => {
    postDataToAPI('/logoutUser').then(res => {
      if (res.data !== undefined) {
        localStorage.removeItem('login_status')
        window.location.replace('/')
      }
    })
  }

  render() {
    return (
      <>
        <nav className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light">
          <div className="navbar-wrapper">
            <div className="navbar-container content">
              <div className="collapse navbar-collapse show" id="navbar-mobile">
                <ul className="nav navbar-nav mr-auto float-left"></ul>
                <ul className="nav navbar-nav float-right">
                  <li className="dropdown dropdown-notification nav-item" onClick={this.logout}><a className="nav-link nav-link-label" data-toggle="dropdown"><i className="ficon ft-log-out"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="main-menu menu-fixed menu-light menu-accordion menu-shadow " data-scroll-to-active="true" data-img="theme-assets/images/backgrounds/02.jpg">
          <div className="navbar-header">
            <ul className="nav navbar-nav flex-row">
              <li className="nav-item mr-auto"><Link to="/dashboard"><a className="navbar-brand"><img className="brand-logo" alt="Chameleon admin logo" src="theme-assets/images/logo/logo.png" /><h3 className="brand-text">Tiktok Live</h3></a></Link></li>
              <li className="nav-item d-md-none"><a className="nav-link close-navbar"><i className="ft-x"></i></a></li>
            </ul>
          </div>
          <div className="main-menu-content">
            <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
              {routes.map((e) => (
                <li className="nav-item" key={e.path}><Link to={e.path}><i className={e.icon}></i><span className="menu-title" data-i18n="">{e.name}</span></Link></li>
              ))}
            </ul>
          </div>
          <div className="navigation-background"></div>
        </div>
      </>
    )
  }
}

export default Sidebar;