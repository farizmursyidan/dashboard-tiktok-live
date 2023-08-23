import React, { Component } from "react";
import { postDataToAPI } from "../helper/asyncFunction";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login_form: {}
    };
  }

  handleChangeInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    let login_form = this.state.login_form
    login_form[name] = value;
    this.setState({ login_form: login_form });
  }

  login = async () => {
    const dataLogin = this.state.login_form;
    const respondLogin = await postDataToAPI("/loginUser", dataLogin);

    if (respondLogin.data !== undefined && respondLogin.status >= 200 && respondLogin.status <= 300) {
      localStorage.setItem('login_status', JSON.stringify(respondLogin));
      window.location.replace('/user')
    } else {
      alert('Login gagal!')
    }
  }

  render() {
    return (
      <div>
        <div className="content-wrapper">
          <div className="content-body">
            <div className="row" >
              <div className="col-4"></div>
              <div className="col-4">
                <div className="card">
                  <div className="card-body" style={{ paddingTop: 0 }}>
                    <h3 className="mt-2">Login</h3>
                    <h5 className="mt-2">Username</h5>
                    <fieldset className="form-group">
                      <input type="text" className="form-control" name="username" value={this.state.login_form.username} onChange={this.handleChangeInput} />
                    </fieldset>
                    <h5 className="mt-2">Password</h5>
                    <fieldset className="form-group">
                      <input type="password" className="form-control" name="password" value={this.state.login_form.pasasword} onChange={this.handleChangeInput} />
                    </fieldset>
                    <button className="btn btn-primary" onClick={this.login}>Login</button>
                  </div>
                </div>
              </div>
              <div className="col-4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;