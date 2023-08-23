import React, { Component } from "react";
import { getDataFromAPI, convertDateFormatFull } from "../helper/asyncFunction";

class Aktivitas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aktivitas_list: []
    };
  }

  componentDidMount() {
    let data_login = localStorage.getItem('login_status')
    if (!data_login) {
      window.location.replace('/')
    }
    getDataFromAPI("/aktivitas").then((res) => {
      console.log("Aktivitas list", res);
      if (res.data !== undefined) {
        this.setState({ aktivitas_list: res.data.aktivitas })
      }
    });
  }

  render() {
    return (
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Aktivitas</h4>
                  </div>
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Email</th>
                              <th>Username Tiktok</th>
                              <th>Game</th>
                              <th>Tanggal Live</th>
                              <th>Total Gift</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.aktivitas_list.map(e => (
                              <tr key={e.no}>
                                <th scope="row">{e.no}</th>
                                <td>{e.email}</td>
                                <td>{e.username_tiktok}</td>
                                <td>{e.game}</td>
                                <td>{convertDateFormatFull(e.tgl_live)}</td>
                                <td>{e.total_gift}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Aktivitas;