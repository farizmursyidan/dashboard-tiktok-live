import React, { Component } from "react";
import { Button, Row, Col } from "reactstrap";
import { postDataToAPI } from "../helper/asyncFunction";
import { io } from 'socket.io-client';

class Live extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input_live: {},
      live_comment: [],
      live_join: null,
      connection_status: null,
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
    this.setState({ connection_status: 'Connecting...' })
    postDataToAPI("/connectLiveReact", { username: this.state.input_live.username }).then((res) => {
      if (res.data !== undefined) {
        const socket = io("http://localhost:8081");
        this.setState({ connection_status: res.data.message })
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
            this.setState({ live_comment: array })
          }
        });
        socket.on("like", (arg) => {
          if (arg.room === `room_${this.state.input_live.username}`) {
            let array = [...this.state.live_comment]
            let find_duplicate = array.find((e) => e.nickname === arg.message.nickname && e.type === 'like')
            if (!find_duplicate) {
              array.push({
                nickname: arg.message.nickname,
                type: 'like',
                content: ''
              })
            }
            this.setState({ live_comment: array })
          }
        });
        socket.on("social", (arg) => {
          if (arg.room === `room_${this.state.input_live.username}`) {
            let array = [...this.state.live_comment]
            if (arg.message.displayType.includes('follow')) {
              let find_duplicate = array.find((e) => e.nickname === arg.message.nickname && e.type === 'follow')
              if (!find_duplicate) {
                array.push({
                  nickname: arg.message.nickname,
                  type: 'follow',
                  content: ''
                })
              }
            } else if (arg.message.displayType.includes('share')) {
              let find_duplicate = array.find((e) => e.nickname === arg.message.nickname && e.type === 'share')
              if (!find_duplicate) {
                array.push({
                  nickname: arg.message.nickname,
                  type: 'share',
                  content: ''
                })
              }
            }
            this.setState({ live_comment: array })
          }
        });
        socket.on("streamEnd", (arg) => {
          if (arg.room === `room_${this.state.input_live.username}`) {
            this.setState({ connection_status: "Live telah berakhir" })
          }
        });
      } else {
        this.setState({ connection_status: 'User sedang tidak live' })
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
                      <Row style={{ marginTop: 0, paddingTop: 0 }}>
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
                        {this.state.connection_status}
                      </div>
                      <div style={{ marginTop: 24 }}>
                        {this.state.live_comment.map(e => (
                          e.type === 'chat' ? (<div><strong>{e.nickname}</strong>{` berkomentar: ${e.content}`}</div>) :
                            e.type === 'gift' ? (<div><strong>{e.nickname}</strong>{` memberikan: ${e.content}`}</div>) :
                              e.type === 'like' ? (<div><strong>{e.nickname}</strong>{` menyukai live ini`}</div>) :
                                e.type === 'follow' ? (<div><strong>{e.nickname}</strong>{` mengikuti host`}</div>) :
                                  e.type === 'share' ? (<div><strong>{e.nickname}</strong>{` membagikan live ini`}</div>) :
                                    (<></>)
                        ))}
                      </div>
                      <div>
                        <strong>{this.state.live_like}</strong>{this.state.live_like && ` liked this live`}
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