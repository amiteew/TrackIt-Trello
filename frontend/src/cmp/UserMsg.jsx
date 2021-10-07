import React from 'react'

import { eventBusService } from '../services/event-bus.service.js'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ErrorIcon from '@mui/icons-material/Error';

export class UserMsg extends React.Component {

  removeEvent;

  state = {
    msg: null
  }

  componentDidMount() {
    // Here we listen to the event that we emited, its important to remove the listener 
    this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
      this.setState({ msg })
      setTimeout(() => {
        this.setState({ msg: null })
      }, 2500)
    })
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  render() {
    console.log('im in user-msg')
    if (!this.state.msg) return <span></span>
    const msgType = this.state.msg.type || ''
    return (
      <section className={'user-msg  flex direction-row align-center'}>
        <div className=" txt-msg flex direction-row align-center">
          {msgType === 'danger' && <ErrorIcon />}
          {msgType === 'success' && <DoneOutlineIcon />}
          {this.state.msg.txt}
        </div>
        <button onClick={() => {
          this.setState({ msg: null })
        }}>x</button>
      </section>
    )
  }
}
