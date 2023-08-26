import React, { Component } from "react";
import { Button, Row, Col } from "reactstrap";
import { postDataToAPI } from "../helper/asyncFunction";
import { io } from 'socket.io-client';

const socket = io("http://localhost:8081");

class Live extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input_live: {},
      live_comment: [],
      live_join: null
    };
  }

  componentDidMount() {
    let data_login = localStorage.getItem('login_status')
    if (!data_login) {
      window.location.replace('/')
    }
  }

  handleChangeInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    let input_live = { ...this.state.input_live }
    input_live[name] = value;
    this.setState({ input_live: input_live });
  };

  connectLive = () => {
    postDataToAPI("/connectLiveReact", { username: this.state.input_live.username }).then((res) => {
      if (res.data !== undefined) {
        socket.on("chat", (arg) => {
          if (arg.room === `room_${this.state.input_live.username}`) {
            let array = [...this.state.live_comment]
            let find_duplicate = array.find((e) => e.nickname === arg.message.nickname && e.type === 'chat' && e.content === arg.message.comment)
            if (!find_duplicate) {
              array.push({
                nickname: arg.message.nickname,
                type: 'chat',
                content: arg.message.comment
              })
            }
            this.setState({ live_comment: array })
          }
        });
        socket.on("member", (arg) => {
          if (arg.room === `room_${this.state.input_live.username}`) {
            this.setState({ live_join: arg.message.nickname })
          }
        });
        socket.on("gift", (arg) => {
          if (arg.room === `room_${this.state.input_live.username}`) {
            let array = [...this.state.live_comment]
            array.push({
              nickname: arg.message.nickname,
              type: 'gift',
              content: arg.message.giftName
            })
            console.log('test', array)
            this.setState({ live_comment: array })
          }
        });
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
                    <h4 className="card-title">Live</h4>
                  </div>
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <Row>
                        <Col md="3">
                          <h5 className="mt-2">Input Username</h5>
                          <fieldset className="form-group">
                            <input type="text" className="form-control" name="username" value={this.state.input_live.username} onChange={this.handleChangeInput} />
                          </fieldset>
                          <Button color="primary" onClick={this.connectLive}>
                            Connect
                          </Button>
                        </Col>
                      </Row>
                      <div style={{ marginTop: 24 }}>
                        {this.state.live_comment.map(e => (
                          e.type === 'chat' ? (<div><strong>{e.nickname}</strong>{` berkomentar: ${e.content}`}</div>) :
                            e.type === 'gift' ? (<div><strong>{e.nickname}</strong>{` memberikan: ${e.content}`}</div>) :
                              (<></>)
                        ))}
                      </div>
                      <div>
                        <strong>{this.state.live_join}</strong>{this.state.live_join && ` joined`}
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

export default Live;