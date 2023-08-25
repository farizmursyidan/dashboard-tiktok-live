import React, { Component } from "react";
import { getDataFromAPI, patchDataToAPI, postDataToAPI, convertDateFormatFull } from "../helper/asyncFunction";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class User extends Component {
  constructor(props) {
    super(props);

    let date = new Date();
    date.setDate(date.getDate() + 7);

    this.state = {
      user_list: [],
      modal_edit: false,
      modal_new_user: false,
      selected_user: {},
      new_user: {}
    };
  }

  componentDidMount() {
    let data_login = localStorage.getItem('login_status')
    if (!data_login) {
      window.location.replace('/')
    }
    getDataFromAPI("/user").then((res) => {
      if (res.data !== undefined) {
        for (let x of res.data.user_list) {
          x['tgl_expired'] = convertDateFormatFull(x['tgl_expired'])
        }
        this.setState({ user_list: res.data.user_list })
      }
    });
  }

  toggleModalEdit = (id) => {
    this.setState((prevState) => ({ modal_edit: !prevState.modal_edit }));
    let user_list = [...this.state.user_list]
    if (typeof id === 'number') {
      this.setState({ selected_user: user_list.find((e) => e.no === id) })
    }
  }

  toggleModalNewUser = () => {
    this.setState((prevState) => ({ modal_new_user: !prevState.modal_new_user }));
  }

  handleChangeInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    let selected_user = { ...this.state.selected_user }
    selected_user[name] = value;
    this.setState({ selected_user: selected_user });
  };

  handleChangeInputNewUser = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    let new_user = this.state.new_user
    new_user[name] = value;
    this.setState({ new_user: new_user });
  };

  saveUpdatedUser = async () => {
    const responseSaveUser = await patchDataToAPI("/user", { data: this.state.selected_user })
    if (responseSaveUser.data !== undefined && responseSaveUser.status >= 200 && responseSaveUser.status <= 300) {
      alert('Berhasil update data!')
      this.toggleModalEdit()
      window.location.reload()
    } else {
      alert('Gagal update data! Coba lagi!')
      this.toggleModalEdit()
    }
  }

  submitNewUser = async () => {
    const responseSubmitUser = await postDataToAPI("/user", { data: this.state.new_user })
    if (responseSubmitUser.data !== undefined && responseSubmitUser.status >= 200 && responseSubmitUser.status <= 300) {
      alert('Berhasil tambah user!')
      this.toggleModalNewUser()
      window.location.reload()
    } else {
      alert('Gagal tambah user! Coba lagi!')
      this.toggleModalNewUser()
    }
  }

  render() {
    return (
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header" style={{ display: 'inline' }}>
                    <h4 className="card-title">User</h4>
                    <Button color="primary" style={{ float: "right" }} onClick={this.toggleModalNewUser}><i className="ft-plus"></i>&nbsp;User Baru</Button>
                  </div>
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Status</th>
                              <th>Email</th>
                              <th>Lisensi</th>
                              <th>Game</th>
                              <th>Tanggal Expired</th>
                              <th>Live</th>
                              <th>Edit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.user_list.map(e => (
                              <tr key={e.no}>
                                <th scope="row">{e.no}</th>
                                <td>{e.status ? 'ON' : 'OFF'}</td>
                                <td>{e.email}</td>
                                <td>{e.lisensi}</td>
                                <td>{e.game}</td>
                                <td>{convertDateFormatFull(e.tgl_expired)}</td>
                                <td>{e.live ? 'ON' : 'OFF'}</td>
                                <td><button type="button" className="btn btn-primary btn-min-width mr-1 mb-1" onClick={() => this.toggleModalEdit(e.no)}>Edit</button></td>
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
        <Modal isOpen={this.state.modal_edit} toggle={this.toggleModalEdit} className={"modal-md"}>
          <ModalHeader>
            <div>Edit User</div>
          </ModalHeader>
          <ModalBody>
            <div className="card-block">
              <div className="card-body" style={{ paddingTop: 0 }}>
                <h5 className="mt-2">Status</h5>
                <fieldset className="form-group">
                  <select className="form-control" name="status" value={this.state.selected_user.status} onChange={this.handleChangeInput}>
                    <option value={1}>ON</option>
                    <option value={0}>OFF</option>
                  </select>
                </fieldset>
                <h5 className="mt-2">Email</h5>
                <fieldset className="form-group">
                  <input type="text" className="form-control" name="email" value={this.state.selected_user.email} onChange={this.handleChangeInput} disabled />
                </fieldset>
                <h5 className="mt-2">Lisensi</h5>
                <fieldset className="form-group">
                  <input type="text" className="form-control" name="lisensi" value={this.state.selected_user.lisensi} onChange={this.handleChangeInput} maxLength="10" />
                </fieldset>
                <h5 className="mt-2">Game</h5>
                <fieldset className="form-group">
                  <input type="text" className="form-control" name="game" value={this.state.selected_user.game} onChange={this.handleChangeInput} />
                </fieldset>
                <h5 className="mt-2">Tanggal Expired</h5>
                <fieldset className="form-group">
                  <input type="datetime-local" className="form-control" name="tgl_expired" value={this.state.selected_user.tgl_expired} onChange={this.handleChangeInput} />
                </fieldset>
                <h5 className="mt-2">Live</h5>
                <fieldset className="form-group">
                  <select className="form-control" name="live" value={this.state.selected_user.live} onChange={this.handleChangeInput}>
                    <option value={1}>ON</option>
                    <option value={0}>OFF</option>
                  </select>
                </fieldset>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalEdit}>
              Close
            </Button>
            <Button color="primary" onClick={this.saveUpdatedUser}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modal_new_user} toggle={this.toggleModalNewUser} className={"modal-md"}>
          <ModalHeader>
            <div>User Baru</div>
          </ModalHeader>
          <ModalBody>
            <div className="card-block">
              <div className="card-body" style={{ paddingTop: 0 }}>
                <h5 className="mt-2">Status</h5>
                <fieldset className="form-group">
                  <select className="form-control" name="status" value={this.state.new_user.status} onChange={this.handleChangeInputNewUser}>
                    <option disabled selected hidden>Pilih</option>
                    <option value={1}>ON</option>
                    <option value={0}>OFF</option>
                  </select>
                </fieldset>
                <h5 className="mt-2">Email</h5>
                <fieldset className="form-group">
                  <input type="text" className="form-control" name="email" value={this.state.new_user.email} onChange={this.handleChangeInputNewUser} />
                </fieldset>
                <h5 className="mt-2">Lisensi</h5>
                <fieldset className="form-group">
                  <input type="text" className="form-control" name="lisensi" value={this.state.new_user.lisensi} onChange={this.handleChangeInputNewUser} maxLength="10" />
                </fieldset>
                <h5 className="mt-2">Game</h5>
                <fieldset className="form-group">
                  <input type="text" className="form-control" name="game" value={this.state.new_user.game} onChange={this.handleChangeInputNewUser} />
                </fieldset>
                <h5 className="mt-2">Tanggal Expired</h5>
                <fieldset className="form-group">
                  <input type="datetime-local" className="form-control" name="tgl_expired" value={this.state.new_user.tgl_expired} onChange={this.handleChangeInputNewUser} />
                </fieldset>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalNewUser}>
              Close
            </Button>
            <Button color="primary" onClick={this.submitNewUser}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default User;